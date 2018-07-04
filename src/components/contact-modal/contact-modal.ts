// long press for small contact modal

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
// import { ChatPage1 } from '../videopages';
import { CallService, ContactService } from '../../services';

@Component({
	templateUrl: 'contact-modal.html',
	selector: 'modal-contact'
})
export class ContactModal {
	contact = null
	mode = 'video';
	constructor(private viewCtrl: ViewController, private params: NavParams, private navCtrl: NavController, private callService: CallService, private contactService: ContactService) {

	}

	chat() {
		// this.navCtrl.push(ChatPage1, { chatId: this.contact.id }, { animate: true, direction: 'forward' });
		// this.cancel();
	}

	call() {
		this.callService.phoneCall = (this.mode == 'video') ? false : true;
		this.callService.triggerCall(this.contact);
		this.cancel();
	}

	cancel() {
		this.viewCtrl.dismiss();
	}

	ngOnInit() {

		this.contact = this.params.get('contact');
		this.mode = this.params.get('mode');
	}
}