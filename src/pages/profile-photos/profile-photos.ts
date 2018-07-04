import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProfilePhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-photos',
  templateUrl: 'profile-photos.html',
})
export class ProfilePhotosPage {
  data: any;
  baseurl = "";
  photos = [];
  image;
  constructor(private viewCtr: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
    this.baseurl = this.data.baseUrl;
    this.image = this.data.image;
    this.photos = this.data.photos;

  }

  goback() {
    this.viewCtr.dismiss();


  }

}
