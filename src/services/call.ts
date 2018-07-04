// handles incoming and outgoing video calls

import { Injectable, ApplicationRef } from '@angular/core';
import { SocketService } from './socket';
import { AudioService } from './audio';
// import { ContactService } from './contact';
import { VideoService } from './video';
import { Config } from '../app/config';
import { Platform } from 'ionic-angular';
import { Events, ModalController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { Contact } from 'ionic-native';
import { dateDataSortValue } from 'ionic-angular/util/datetime-util';
declare var
	cordova: any,
	window: any,
	RTCSessionDescription: any,
	RTCPeerConnection: any,
	RTCIceCandidate: any;

@Injectable()
export class CallService {
	maxTimer = 40000
	facing = 'front'
	pickupTimeout = null
	contact = null
	isInCall = false
	isCalling = false
	isAnswering = false
	//duplicateMessages
	muted = false
	lastState = null
	localStream = null
	peerConnection = null
	remoteVideo = null
	localVideo = null
	peerConnectionConfig = null
	modalShowing = false
	modal = null


	phoneCall = true;


	constructor(public storage: Storage, private ref: ApplicationRef, private sanitizer: DomSanitizer, private events: Events, public modalCtrl: ModalController, public socket: SocketService, public platform: Platform, private audio: AudioService, public video: VideoService) {
		// browser compatability for web views
		console.log("callss")
		window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
		window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
		window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;

		// STUN/TURN ice servers for connection negotiation
		this.peerConnectionConfig = {
			'iceServers': Config.ice
		};

		this.socket.on('messageReceived', (contact, message) => {

			console.debug('Message', message);

			switch (message.type) {
				case 'call':
					console.log('incoming call...', contact, message, this.contact);
					this.phoneCall = message.phoneCall
					if (this.isCalling) {
						// we are trying to call eachother. just answer it automaticly
						if (this.contact.id == contact.email) {
							clearTimeout(this.pickupTimeout);
							this.pickupTimeout = null;
							this.isCalling = false;
							this.isAnswering = true;
							this.audio.pause('calling')
							this.answer();
							return;
						}

						// ignore this incoming call if we are busy
						this.audio.pause('calling');
						this.ignore(false, contact.email);
						return;
					}

					this.audio.play('calling');

					this.pickupTimeout = setTimeout(() => {
						console.log('Call took too long to pick up. Ending.');
						// missed video call
						console.log(contact, this.contact)
						var tContact = { image: contact.user.Profile_pic, name: contact.user.name }
						this.historySetting(tContact, '1', 'in');
						this.end();
					}, this.maxTimer);

					// start a new call
					let tempcontact = {
						id: contact.email,
						name: contact.user.name,
						username: contact.user.username,
						image: contact.user.Profile_pic,
						imagePath:Config.providerurl + contact.user.Profile_pic

					}
					this.contact = tempcontact

					this.isAnswering = true;
					this.showModal();
					this.preview();
					this.refreshVideos();
					break;

				case 'answer':
					this.audio.pause('calling');
					clearTimeout(this.pickupTimeout);
					this.pickupTimeout = null;

					this.isInCall = true;
					this.isCalling = false;
					this.refreshVideos();

					this.call(true, this.contact.id);
					break;

				case 'ignore':
				case 'cancel':
					// history
					console.log("cancelled from contact", contact, this.contact)
					this.historySetting(this.contact, '1', 'in')

					this.end();
					break;

				case 'end':
					if (this.isInCall || this.isCalling || this.isAnswering) {
						this.end();
					}
					break;
				/*
								case 'phonertc_handshake':
									if (duplicateMessages.indexOf(message.data) === -1) {
										this.Contact[name].receiveMessage(JSON.parse(message.data));
										duplicateMessages.push(message.data);
									}
									break;
				*/

			}




			if (message.sdp) {
				this.peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
					if (message.sdp.type == 'offer') {
						this.peerConnection.createAnswer(d => {
							//							this.gotDescription.call(this, [d]);
							this.gotDescription(d);
						}, e => {
							console.log('error creating answer', e);
						});
					}
				});
			} else if (message.ice) {
				this.peerConnection.addIceCandidate(new RTCIceCandidate(message.ice));
			}
		});
	}



	// authenticate a user using jwt
	public auth(force) {
		let token
		this.storage.ready().then(() => {
			this.storage.get('blindyVariables').then((val) => {
				token = val;
				console.log('REAL TOKEN', token);
				this.socket.emit('auth', JSON.parse(token));
			}).catch(function (err) {
				console.log(err);
			})
		}).catch(function (err) {
			console.log(err);
		});


		// if (token) {
		// 	token = token.token;
		// }
		// console.debug('token', token);

		// this.socket.emit('auth', token);



	}
	public logout() {

		// this.events.publish('user.logout');
		this.socket.emit('logout', null);
	}

	public historySetting(contact, missed, outIn) {
		var calls = JSON.parse(localStorage.getItem('calls')) ? JSON.parse(localStorage.getItem('calls')) : [];
		console.log(this.functionDate())
		calls.unshift({ Profile_pic: Config.providerurl + contact.image, userName: contact.name, callKind: this.phoneCall ? "call" : "videocam", date: this.functionDate(), outIn: outIn, missedState: missed })
		localStorage.setItem('calls', JSON.stringify(calls))
		console.log(calls);


	}
	// make date
	functionDate() {
		let day = new Date();
		let now = Date.now();
		let Todaydate = day.getDate() + '/' + Math.floor(day.getMonth() + 1) + '/' + day.getFullYear();

		var hours: any = day.getHours();
		var minutes: any = day.getMinutes();
		if (hours < 10) {
			hours = '0' + hours;
		} else {
			hours = hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		} else {
			minutes = minutes;
		}
		var time = hours + ':' + minutes;
		return [Todaydate, time];
	}
	// place a new call
	public triggerCall(contact) {
		this.historySetting(contact, '0', 'out');


		this.audio.play('calling');
		this.showModal();
		if (this.isInCall) {
			return;
		}

		this.preview();

		this.pickupTimeout = setTimeout(() => {
			console.log('Call took too long to pick up. Ending.');
			this.end();
		}, this.maxTimer);

		console.log('calling ', contact);
		this.contact = contact;
		this.isCalling = true;
		this.socket.emit('sendMessage', contact.id, {
			type: 'call', phoneCall: this.phoneCall
		});
	}

	// open the call modal
	showModal() {
		this.events.publish('call.trigger.show', this.contact);
		this.modalShowing = true;
	};

	private gotDescription(description) {
		console.log('got description', description, this.contact);
		this.peerConnection.setLocalDescription(description, () => {
			this.socket.emit('sendMessage', this.contact.id, {
				'sdp': description
			});
		}, e => {
			console.log('set description error', e)
		});
	}

	private gotIceCandidate(event) {
		if (event.candidate != null) {
			this.socket.emit('sendMessage', this.contact.id, {
				'ice': event.candidate
			});
		}
	}

	private gotRemoteStream(event) {
		console.log('got remote stream');
		this.remoteVideo = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.stream));
		this.refreshVideos();
	}

	// a hacky way to make sure we get the latest video position reguardless of animations or transitions
	// another way might be to use iosrtc.observeVideo(video) or an $interval
	refreshVideos() {
		// tell the modal that we need to revresh the video
		if (this.phoneCall) return;
		this.ref.tick();

		if (!this.platform.is('cordova')) {
			return;
		}
		try {
			for (var x = 0; x <= 3000; x += 300) {
				console.log(x)
				setTimeout(cordova.plugins.iosrtc.refreshVideos, x);
			}
		} catch (e) {
			console.log(e);
		}
	};

	hideModal() {
		this.events.publish('call.trigger.hide', true);
	}

	// end the call in either direction
	end() {

		this.audio.pause('calling');
		if (this.peerConnection) {
			this.peerConnection.close();
		}

		this.localVideo = null;
		this.remoteVideo = null;
		this.isAnswering = false;
		this.isCalling = false;
		this.isInCall = false;
		this.localStream = null;

		this.video.disconnect().then(() => {
			this.hideModal();
			this.refreshVideos();
		});

		if (!this.contact) {
			return;
		}

		this.socket.emit('sendMessage', this.contact.id, {
			type: 'end'
		});
		this.contact = null;
	}

	// add local stream
	addStream(stream, timeout) {
		this.localStream = stream;
		setTimeout(() => {
			this.localVideo = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(stream));
		}, timeout);
	}

	// preview local video as full screen
	preview() {
		if (this.phoneCall) return;
		this.video.connect(false, !this.phoneCall, this.facing).then(stream => {
			this.addStream(stream, 10);
		});
	};

	// begin a call using webrtc
	call(isInitiator, contactId) {
		console.log('calling ' + contactId + ', isInitiator: ' + isInitiator);

		var connect = () => {
			this.peerConnection = new RTCPeerConnection(this.peerConnectionConfig);

			this.peerConnection.onicecandidate = this.gotIceCandidate.bind(this);
			this.peerConnection.onaddstream = this.gotRemoteStream.bind(this);
			this.peerConnection.oniceconnectionstatechange = event => {
				this.lastState = event.target.iceConnectionState;
				console.debug('ice state', this.lastState);
				if (this.lastState === 'failed' || this.lastState === 'disconnected' || this.lastState === 'closed') {
					this.peerConnection = null;
					this.end();
				}
			};
			this.peerConnection.addStream(this.localStream);

			if (isInitiator) {
				//this.isCalling = true;
				console.debug('creating offer');
				this.peerConnection.createOffer(d => {
					//this.gotDescription.call(this, [d]);
					this.gotDescription(d);
				}, e => {
					console.log('error creating offer', e)
				});
			} else {
				//this.isAnswering = true;
			}
		};

		this.video.connect(true, !this.phoneCall, this.facing).then(stream => {
			this.addStream(stream, 1000);
			connect();
		});
		// if (!this.localStream) {
		// 	this.video.connect(true, !this.phoneCall, this.facing).then(stream => {
		// 		this.addStream(stream, 1000);
		// 		connect();
		// 	});
		// } else {
		// 	connect();
		// }
		// session.on('sendMessage', data => {
		// 	Socket.emit('sendMessage', contact.id, {
		// 		type: 'phonertc_handshake',
		// 		data: JSON.stringify(data)
		// 	});
		// });
		//
		// this.Contact[contact.id] = session;
		//
	}

	// cancel a call being placed
	cancel() {
		this.socket.emit('sendMessage', this.contact.id, {
			type: 'cancel'
		});
		this.end();
	};

	// ignore an incomming call
	ignore(end, name) {
		// history
		this.historySetting(this.contact, '0', 'in');

		this.socket.emit('sendMessage', name || this.contact.id, {
			type: 'ignore'
		});
		if (!end) return;
		this.end();
	};

	// answer in incoming call
	answer() {
		if (this.isInCall) {
			return;
		}
		this.audio.pause('calling');
		clearTimeout(this.pickupTimeout);
		this.pickupTimeout = null;

		this.isInCall = true;
		this.isAnswering = false;
		this.call(false, this.contact.id);

		// history
		this.historySetting(this.contact, '0', 'in')

		setTimeout(() => {
			this.socket.emit('sendMessage', this.contact.id, {
				type: 'answer'
			});
		});
		this.refreshVideos();
	}

	// swap the camera facing. defaults to front facing to start
	flip() {
		this.facing = this.facing == 'front' ? 'back' : 'front';

		this.video.connect(!this.muted, !this.phoneCall, this.facing).then(stream => {
			console.debug('using new facing stream', stream);
			this.addStream(stream, 0);
			this.peerConnection.addStream(this.localStream);
		});
	}

	// mute the microphone and attach a new stream to connection
	// note: doesnt seem to work quite right on all brwosers
	mute() {
		this.muted = !this.muted;
		console.debug((this.muted ? '' : 'un') + 'muting...');

		if (this.muted) {
			this.video.mute();
		} else {
			this.video.unmute().then(stream => {
				console.debug('using muted stream', stream);
				this.addStream(stream, 0);
				this.peerConnection.addStream(this.localStream);
			});
		}
	}
}