import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Events, NavParams, ModalController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import * as Jq from 'jquery';
import { ProviderPage } from '../provider/provider';
import * as contry from 'countries-cities';
import { IndexPage } from '../index/index';
import { ImagePage } from '../image/image';
import { Storage } from '@ionic/storage';
import { DatePage } from '../date/date';
import { ChatPage } from '../chat/chat';
import { CallsPage } from '../calls/calls';
// import { CallPage } from '../call/call';
import { StatusBar } from '@ionic-native/status-bar';
import { ContactModal } from '../../components';
import { CallService } from '../../services';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ProfilePhotosPage } from '../../pages/profile-photos/profile-photos';
import { SplashScreen } from '@ionic-native/splash-screen';
import { enableProdMode } from '@angular/core';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Slides) slides: Slides;

	searchValue: string;
	profileinfo: any;
	profileinfo2: any;
	profileComplete: boolean = false;
	home: boolean = true;
	friendsPage: boolean = false;
	profilePage: boolean = false;
	myMatchPage: boolean = false;
	settings: boolean = false;
	settings1: boolean = false;
	help: boolean = false;

	countries: any;
	holder: any;
	countries1: any;
	country: string;
	cities: any;
	dateCheck: any;
	city: string;
	email: string;
	accountInfo: any;
	dumAge: number;
	dumAge1: number;
	age: string;
	matchData: string;
	age1: string;
	gender: string;
	gender1: string;
	orientation: string;
	orientation1: string;
	intension: string;
	intension1: string;
	city1: string;
	country1: string;
	cities1: any;
	friends: any = [];
	chats: any = [];

	backgroundMode = true;

	pages: Array<{ title: string, component: any, icon: string, active: boolean }>;
	constructor(private splashScreen: SplashScreen, private androidPermissions: AndroidPermissions, private callservice: CallService, public storage: Storage, public modalCtrl: ModalController, public navCtrl: NavController,
		public navParams: NavParams, public events: Events, public provider: ProviderPage, public menuCtrl: MenuController) {
		this.provider.setBackgroundMode(this.backgroundMode);

		// enableProdMode();
		// this.pages = [
		// 	{ title: 'Call History', component: 'HomePage', active: true },
		// 	{ title: 'Settings', component: 'HomePage', active: false },
		// 	{ title: 'Help', component: 'HomePage', active: false },
		// 	{ title: 'Logout', component: 'HomePage', active: false }
		// ];
		this.pages = [
			{ title: 'Home', component: 'HomePage', icon: 'home', active: true },
			{ title: 'My Match', component: 'HomePage', icon: 'heart', active: false },
			{ title: 'My Friends', component: 'HomePage', icon: 'people', active: false },
			{ title: 'Call History', component: 'HomePage', icon: 'call', active: false },
			{ title: 'My Profile', component: 'HomePage', icon: 'person', active: false },
			{ title: 'Settings', component: 'HomePage', icon: 'settings', active: false },
			{ title: 'Help', component: 'HomePage', icon: 'information-circle', active: false },
			{ title: 'Logout', component: 'Homepage', icon: 'log-out', active: false }
		];


		this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.READ_PHONE_STATE]);

		this.dateCheck = this.provider.functionDate();
		storage.ready().then(() => {
			storage.get('blindyVariables').then((val) => {
				if (val) {
					let info = JSON.parse(val);
					this.email = info.email;
					var em = this.email;
					var self = this;
					setTimeout(function () {
						self.initData();
					}, 500)
				}
			}, err => {
				console.log(err);
			});
		}, err => {
			console.log(err);
		});
		this.profileinfo = [
			{ title: 'Your Age Range', options: ['18 - 29', '30 - 59', '60 - 90'] },
			{ title: 'What are you interested in?', options: ['Just for fun', 'New friends', 'Dating', 'Long term'] },
			{ title: 'Gender', options: ['Male', 'Female'] },
			{ title: 'Orientation', options: ['Straight', 'Gay'] }];
		this.dumAge = 18;
		this.dumAge1 = 18;
		this.profileinfo2 = [
			{ title: 'Your Match Age Range', options: ['18 - 29', '30 - 59', '60 - 90'] },
			{ title: 'Your match intensions', options: ['Just for fun', 'New friends', 'Dating', 'Long term'], module: 'intension' },
			{ title: 'Gender', options: ['Male', 'Female'] },
			{ title: 'Orientation', options: ['Straight', 'Gay'] }];

		this.countries = contry.getCountries().sort();
		this.countries1 = contry.getCountries().sort();

		this.events.subscribe('HomeEvents', (datam) => {
			switch (datam.info[0]) {
				case "userBasic":
					this.accountInfo = datam.info[1];
					this.profileComplete = this.accountInfo.Profile;
					console.log('====================')
					console.log(this.accountInfo);
					if (this.profileComplete == true) {
						this.age = this.accountInfo.age;
						this.age1 = this.accountInfo.age;
						// console.log('Gender: ' + this.accountInfo.gender);
						// this.gender = this.accountInfo.gender == null ? 'male' : this.accountInfo.gender;
						// this.gender1 = this.accountInfo.gender == null ? 'male' : this.accountInfo.gender;
						// console.log('Gender: ' + this.accountInfo.orientation);
						// this.orientation = this.accountInfo.orientation == null ? 'male' : this.accountInfo.orientation;
						// this.orientation1 = this.accountInfo.orientation == null ? 'male' : this.accountInfo.orientation;
						this.gender = 'male';
						this.gender1 = this.gender;
						this.orientation = 'straight';
						this.orientation1 = this.orientation;
						this.intension = this.accountInfo.intention;
						this.intension1 = this.accountInfo.intention;
						this.country1 = this.accountInfo.country;
						this.country = this.accountInfo.country;
						this.city1 = this.accountInfo.city;
						this.city = this.accountInfo.city;
						this.cities = contry.getCities(this.country).sort();
						this.cities1 = contry.getCities(this.country1).sort();
					}
					break;
				case 'dateFound':
					let profileModal = this.modalCtrl.create(DatePage, { data: datam.info[1], myInfo: this.accountInfo });
					profileModal.present();
					break;
				case 'friendChat':
					this.chats.push(datam.info[1]);
					this.chats = this.chats.sort(function (a, b) {
						return b.time - a.time;
					});
					if (datam.info[1].more.Status !== 'Add to friends') {
						this.friends.push(datam.info[1]);
						this.friends = this.friends.sort(function (a, b) {
							return b.time - a.time;
						});
						console.log("friends", this.friends);
					}
			}
		})
		this.events.subscribe('MessageReception', (datam) => {
			var data = datam.data;
			var index;
			switch (data[0]) {
				case "messageSent":
					var sender = data[2];
					var receiver = data[3];
					var newChat;
					if (sender.id == this.email) {
						index = this.chats.findIndex(m => m.id == receiver.id);
						if (index > -1) {
							this.chats[index].unread = 0;
							this.chats[index].message = data[1];
							newChat = this.chats[index];
							this.chats.splice(index, 1);
							this.chats.unshift(newChat);
						} else {
							this.chats.unshift(receiver);
						}
					} else if (receiver.id == this.email) {
						var index1 = this.chats.findIndex(m => m.id == sender.id);
						if (index1 > -1) {
							this.chats[index1].unread += 1;
							this.chats[index1].message = data[1];
							newChat = this.chats[index1];
							this.chats.splice(index1, 1);
							this.chats.unshift(newChat);

						} else {
							this.chats.unshift(sender);
						}
					}

					break;
				case 'updateRead':
					index;
					if (data[1][1] == this.email) {
						index = this.chats.findIndex(m => m.id == data[1][2]);
						if ((index > -1) && (this.chats[index].message && this.chats[index].message.from == data[1][2] && this.chats[index].message.to == this.email)) {
							this.chats[index].unread = 0;
						}

					} else if (data[1][2] == this.email) {
						index = this.chats.findIndex(m => m.id == data[1][1]);
						if ((index > -1) && (this.chats[index].message && this.chats[index].message.from == this.email && this.chats[index].message.to == data[1][2])) {
							this.chats[index].message.read = true;
						}
					}
					break;
			}
		});
		// this.events.subscribe('CallResponse', (data) => {
		// 	this.navCtrl.push(CallPage, data);
		// })
		this.events.subscribe('FriendResponse', (data) => {
			var datam = data.data;
			var indexFriend;
			var status;
			if (datam) {
				switch (datam[0]) {
					case "requestAdd":
						if (datam[3] == this.email) {
							indexFriend = this.chats.findIndex(y => y.more.Id == datam[4]);
							status = 'Remove request';
						} else if (datam[4] == this.email) {
							indexFriend = this.chats.findIndex(y => y.more.Id == datam[3]);
							status = 'Accept';
						}
						if (indexFriend !== undefined) {
							this.chats[indexFriend].more.Status = status;
							this.friends.push(this.chats[indexFriend]);
						}
						break;
					case 'requestRemove':

						if (datam[2] == this.email) {
							indexFriend = this.friends.findIndex(y => y.more.Id == datam[3]);
							this.friends.splice(indexFriend, 1);

						} else if (datam[3] == this.email) {
							indexFriend = this.friends.findIndex(y => y.more.Id == datam[2]);
							this.friends.splice(indexFriend, 1);

						}
						break;
					case 'acceptedRequest':
						if (datam[2] == this.email) {
							indexFriend = this.friends.findIndex(y => y.more.Id == datam[3]);
						} else if (datam[3] == this.email) {
							indexFriend = this.friends.findIndex(y => y.more.Id == datam[2]);
						}
						this.friends[indexFriend].more.Status = datam[1];
						break;
					case "Block":
						if (datam[3] == this.email) {
							for (let m = 0; m < this.chats.length; m++) {
								if (this.chats[m].id == datam[4]) {
									this.chats[m].more.Block = 'Unblock';
								}
							}
							for (let m = 0; m < this.friends.length; m++) {
								if (this.friends[m].id == datam[4]) {
									this.friends[m].more.Block = 'Unblock'
								}
							}
						} else if (datam[4] == this.email) {
							for (let m = 0; m < this.chats.length; m++) {
								if (this.chats[m].id == datam[3]) {
									this.chats[m].more.Block = 'Blocked'
								}
							}
							for (let m = 0; m < this.friends.length; m++) {
								if (this.friends[m].id == datam[3]) {
									this.friends[m].more.Block = 'Blocked'
								}
							}
						}
						break;
					case "Unblock":
						if (datam[2] == this.email) {
							for (let m = 0; m < this.chats.length; m++) {
								if (this.chats[m].id == datam[3]) {
									this.chats[m].more.Block = 'Block'
								}
							}
							for (let m = 0; m < this.friends.length; m++) {
								if (this.friends[m].id == datam[3]) {
									this.friends[m].more.Block = 'Block'
								}
							}
						} else if (datam[3] == this.email) {
							for (let m = 0; m < this.chats.length; m++) {
								if (this.chats[m].id == datam[2]) {
									this.chats[m].more.Block = 'Block'
								}
							}
							for (let m = 0; m < this.friends.length; m++) {
								if (this.friends[m].id == datam[2]) {
									this.friends[m].more.Block = 'Block'
								}
							}
						}
						break;



				};
			}
		})
		this.events.subscribe('profileImageUpdatedMore', (data) => {
			if (data.owner == this.accountInfo.Email) {
				this.accountInfo.More_pic[data.index] = data.image;
			} else {
				var ind1 = this.friends.findIndex(n => n.id == data.owner);
				var ind2 = this.chats.findIndex(n => n.id == data.owner);
				if (ind1 !== -1) {
					this.friends[ind1].More_pic[data.index] = data.image;
				}

			}
		});
		this.events.subscribe('profileImageUpdated', (data) => {
			if (data.owner == this.accountInfo.Email) {
				this.accountInfo.Profile_pic = data.image;
			} else {
				var ind1 = this.friends.findIndex(n => n.id == data.owner);
				var ind2 = this.chats.findIndex(n => n.id == data.owner);
				if (ind1 !== -1) {
					this.friends[ind1].image = data.image;
				}

				if (ind2 !== -1) {
					this.chats[ind2].image = data.image;
				}
			}
		});
	}

	notify() {
		this.provider.setBackgroundMode(this.backgroundMode);
	}
	imageclicked(user, e) {
		e.stopPropagation();
		console.log(user);
		if (user.more.Status == 'Unfriend') {
			let modalCtr = this.modalCtrl.create(ProfilePhotosPage, { data: { image: user.image, photos: user.more_pic, userName: user.name, baseUrl: this.provider.url } });
			modalCtr.present();

			// this.provider.showImage([user.image]);

		}
	}
	friendClicked(info) {
		var friend = info[1];
		console.log(friend);
		var friendInfo = {
			userName: friend.name,
			Profile_pic: friend.image,
			Email: friend.id,
			More: friend.more
		}
		switch (info[0]) {
			case "chat":

				this.navCtrl.push(ChatPage, { friendInfo: friendInfo, myInfo: this.accountInfo, type: info[3], friend: friend });
				break;

			default:
				// code...
				break;
		}
	}
	action(action, e) {
		e.stopPropagation();
		this.provider.socketRequest({ data: ['friendAction', action[0], this.email, action[1]] });
	}
	submit(data) {
		let info = ['updateProfile', this.email]
		info = info.concat(data);
		this.provider.socketRequest({ data: info });
	}
	submit1(data) {
		this.provider.socketRequest({ data: data });
	}
	countryChanged(country) {
		this.cities = contry.getCities(country).sort();
		this.city = this.cities[0];
	}
	countryChanged1(country1) {
		this.cities1 = contry.getCities(country1).sort();
		this.city1 = this.cities1[0];
	}
	search(hide, show, actn) {
		Jq('#' + hide + ', .slideDiv').slideUp(300, function () {
			Jq('#' + show + '').toggle();
		})
		var activeSlide = this.slides.getActiveIndex();
		this.slides.lockSwipes(true);
		if (actn == 'srch') {
			switch (activeSlide) {
				case 1:
					this.holder = this.friends;
					break;
				case 2:
					this.holder = this.chats;
					break;

			};
		} else {
			Jq('.slideDiv').show();
			this.slides.lockSwipes(false);
			this.searchValue = '';
			this.slideData(activeSlide);
			this.holder = [];
			this.matchData = '';
		}
	}
	searchFunction(searchValue) {
		var activeSlide = this.slides.getActiveIndex();

		if (searchValue.trim() == '') {
			this.slideData(activeSlide);
		} else if (searchValue.trim() !== '' && activeSlide == 2) {

			this.chats = search(this.holder, searchValue);
			if (this.chats.length == 0) {
				this.matchData = 'matching';
			}

		} else if (searchValue.trim() !== '' && activeSlide == 1) {
			this.friends = search(this.holder, searchValue);
			if (this.friends.length == 0) {
				this.matchData = 'matching';
			}
		}
	}
	slideData(activeSlide) {
		switch (activeSlide) {
			case 1:
				this.friends = this.holder;
				break;
			case 2:
				this.chats = this.holder;
				break;

		};
	}
	clearSearch() {
		this.searchValue = '';
		var activeSlide = this.slides.getActiveIndex();
		switch (activeSlide) {
			case 1:
				this.friends = this.holder;
				break;
			case 2:
				this.chats = this.holder;
				break;

		};
	}
	slideChanged() {
		Jq('#Header').slideDown(600);
		// Jq('#Header2').slideUp(600);
		var pos = this.slides.getActiveIndex();
		switch (pos) {
			case 1:
				this.holder = this.friends;
				break;
			case 2:
				this.holder = this.chats;
				break;

		};

		if (pos < 4) {
			Jq('.active').removeClass('active');
			Jq('.cls' + pos + '').addClass('active');
		}
		if ((pos == 1 && this.friends.length > 1) || pos == 2) {
			// Jq('.search1').show();
			Jq('#blindy').show(200);
		} else {
			// Jq('.search1').hide();

		}
	}
	initData() {
		this.chats = [];
		this.friends = [];
		this.provider.socketRequest({ data: ['fetchUserInfo', this.email] });
		this.callservice.logout();
		this.callservice.auth(false);
		setTimeout(() => {
			console.log("data", this.chats, this.friends)
		}, 3000);

	}
	switchSlide(pos) {
		if (pos == 1 || pos == 2)
			this.initData();
		this.slides.lockSwipes(false);
		this.slides.slideTo(pos, 600);
		this.slides.lockSwipes(true);
	}
	gotScrolled(event, div) {
		var pos = 0;
		var scroll = Jq("#" + div + "").scrollTop();
		if ((pos - scroll) < pos) {
			Jq('#blindy').slideUp(100);
		} else {
			Jq('#blindy').slideDown(100);
		}
		pos = scroll;
	}
	presentPopover(myEvent, data) {
		this.provider.presentPopover(myEvent, data);

	}

	call(contact, mode) {
		let modal = this.modalCtrl.create(ContactModal, { contact: contact, mode: mode });
		console.log("contatc++++", contact);
		modal.present();
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		// this.rootPage = page.component;

		switch (page.title) {

			case 'Home':
				this.settings = false;
				this.settings1 = false;
				this.help = false;
				this.profilePage = false;
				this.friendsPage = false;
				this.myMatchPage = false;
				// this.switchSlide(0);
				this.home = true;
				this.menuCtrl.toggle();
				this.menuCtrl.toggle();
				break;

			case 'My Friends':
				this.home = false;
				this.settings1 = false;
				this.settings = false;
				this.help = false;
				this.profilePage = false;
				this.myMatchPage = false;
				this.friendsPage = true;
				// this.switchSlide(2);
				break;

			case 'My Profile':
				this.home = false;
				this.settings = false;
				this.settings1 = false;
				this.help = false;
				this.myMatchPage = false;
				this.friendsPage = false;
				this.profilePage = true;
				// this.switchSlide(3);
				break;

			case 'My Match':
				this.home = false;
				this.settings = false;
				this.settings1 = false;
				this.help = false;
				this.profilePage = false;
				this.friendsPage = false;
				this.myMatchPage = true;
				break;

			case 'Call History':
				let profileModal = this.modalCtrl.create(CallsPage);
				profileModal.onDidDismiss(data => {

					console.log("data", data)
					if (data == "1") {
						this.initData()
						this.slides.slideTo(1, 0);
					}

				})
				profileModal.present();
				break;

			case 'Settings':
				this.home = false;
				this.profilePage = false;
				this.help = false;
				this.myMatchPage = false;
				this.friendsPage = false;
				this.settings = true;
				// this.slides.slideTo(0, 600);
				console.log("slide to settings")
				break;

			case 'Help':
				this.home = false;
				this.profilePage = false;
				this.settings1 = false;
				this.settings = false;
				this.help = true;
				this.slides.slideTo(0, 600);
				break;

			case "Logout":
				this.storage.remove('blindyVariables').then(() => {
					this.callservice.logout();
					this.navCtrl.setRoot(IndexPage);
				}).catch(function (err) {
					console.log(err);
				});
				break;

		}



	}
	imageView(url, kind, index) {
		console.log(url);
		let showdata = {
			Profile_pic: url,
			userName: "profile Photo of " + this.accountInfo.userName
		}

		let profileModal = this.modalCtrl.create(ImagePage, { data: [showdata, "", kind, index] });
		profileModal.present();
	}
	takePhoto(takeKind) {
		switch (takeKind) {
			case 'profilePhoto':
				this.provider.actionCamera('profile', null);
				// imageA.actionCamera();
				break;

			case 'morePhoto':
				let index: any = -1;
				for (let a in this.accountInfo.More_pic) {
					if (this.accountInfo.More_pic[a] == null || this.accountInfo.More_pic[a] == undefined) {
						index = a;
						break;
					}
				}
				if (index == -1)
					index = this.accountInfo.More_pic.length % 6


				this.provider.actionCamera('more', index);
				break;
		}

	}

	returnHome() {
		this.settings = false;
		this.help = false;
		this.profilePage = false;
		this.friendsPage = false;
		this.myMatchPage = false;
		this.home = true;
	}

	// indexSubmit('updateCredential',[username,changeEmail,currentPass,newPass,confirmPass, email] )
	errorMessage
	willChangeEmail

	indexSubmit(module, data) {
		var datam = [];

		if (data[0] && data[0].length == 0) {
			this.errorMessage = 'Enter a user name.';
			Jq('.errMessageH').show();

		} else if (ValidateEmail(data[1])) {
			this.errorMessage = 'Enter a valid email.';
			Jq('.errMessageH').show();
		} else if (data[2] && data[3] && data[4] && (data[2].length < 8 || data[3].length < 8 || data[4].length < 8)) {
			this.errorMessage = 'Password is too short, at least 8 characters.';
			Jq('.errMessageH').show();
		} else if (data[0] == data[3]) {
			this.errorMessage = 'Username cannot be the password.';
			Jq('.errMessageH').show();
		} else if (data[3] != data[4]) {
			this.errorMessage = 'Please confirm newpass and confirmPass.';
			Jq('.errMessageH').show();
		}

		this.willChangeEmail = data[1];


		if (this.errorMessage == undefined) {
			this.provider.showLoad();
			data.unshift(module);
			datam = data;
			// this.provider.socketRequest({ data: datam });
			console.log(datam)
		}
	}
	focus() {
		Jq('.errMessageH').hide();
		this.errorMessage = undefined;
	}
	setrange(event) {
		if (this.dumAge >= 60)
			this.age = '60-90';
		else if (this.dumAge >= 30)
			this.age = '30 - 59';
		else if (this.dumAge >= 18)
			this.age = '18 - 29';

		console.log(this.age);
	}
	setrange1(event) {
		if (this.dumAge1 >= 60)
			this.age1 = '60-90';
		else if (this.dumAge1 >= 30)
			this.age1 = '30 - 59';
		else if (this.dumAge1 >= 18)
			this.age1 = '18 - 29';

		console.log(this.age1);
	}

}

function search(array, value) {
	var returnValue = [];
	var arry = array;
	arry.map(function (y) {
		var index = y.name.toLowerCase().indexOf(value.toLowerCase());
		if (index !== -1) {
			returnValue.push(y);
		}
	})

	return returnValue;


}


function ValidateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
