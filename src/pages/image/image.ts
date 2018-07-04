import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, Events } from 'ionic-angular';
import { ProviderPage } from '../provider/provider';


@IonicPage()
@Component({
	selector: 'page-image',
	templateUrl: 'image.html',
})
export class ImagePage {
	acountInfo: any;
	url: string;
	name: string;
	profileImage: string;
	kind;
	index
	constructor(  public provider: ProviderPage, public navCtrl: NavController, public actionCtrl: ActionSheetController, public events: Events, public viewCtrl: ViewController, public navParams: NavParams) {
		if (this.navParams) {
			var data = this.navParams.get('data');
			this.acountInfo = data[0];
			this.url = data[1];
			this.kind = data[2];
			this.index = data[3];
			this.profileImage = this.url + '' + this.acountInfo.Profile_pic;
			this.name = this.acountInfo.userName;
		}
		this.events.subscribe('profile', (data) => {
			this.profileImage = data.data;
		})
		this.events.subscribe('more', (data) => {
			this.profileImage = data.data;
		})
	}

	redirect(action) {
		switch (action) {
			case "close":
				this.viewCtrl.dismiss();
				break;
			case 'camera':
				this.provider.actionCamera(this.kind, this.index);
			default:
				// code...
				break;
		}

	}


}
