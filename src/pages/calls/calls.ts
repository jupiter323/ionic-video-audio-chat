import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ProviderPage } from '../provider/provider';
@IonicPage()
@Component({
  selector: 'page-calls',
  templateUrl: 'calls.html',
})
export class CallsPage {
  searchValue
  calls = []
  tempCalls = []
  allCalls = []

  selectedAll = true;
  selectedMissed = false;
  modifierSelected = false;
  dateCheck
  constructor(public provider: ProviderPage, public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.dateCheck = this.provider.functionDate();
    this.allCalls = JSON.parse(localStorage.getItem('calls')) ? JSON.parse(localStorage.getItem('calls')) : [];
    console.log(this.dateCheck, this.allCalls)
    this.calls = this.allCalls;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallsPage');
  }

  redirect() {
    localStorage.setItem('calls', JSON.stringify(this.allCalls));
    this.viewCtrl.dismiss();
  }

  goFriend() {
    localStorage.setItem('calls', JSON.stringify(this.allCalls));
    this.viewCtrl.dismiss("1");
  }

  searchFunction(searchValue) {
    if (this.selectedMissed) {
      let temp = []
      this.allCalls.map(a => {
        if (a.missedState == '1')
          temp.push(a)
      })
      this.calls = search(temp, searchValue)
    } else
      this.calls = search(this.allCalls, searchValue);
  }

  clearSearch() {
    this.searchValue = '';
    if (this.selectedMissed) {
      let temp = []
      this.allCalls.map(a => {
        if (a.missedState == '1')
          temp.push(a)
      })
      this.calls = temp
    }
    else
      this.calls = this.allCalls;
  }

  modifier() {
    this.clearSearch()
    this.modifierSelected = !this.modifierSelected;
    this.tempCalls = []
    this.allCalls.map(c => {
      this.tempCalls.push(c)
    })
  }

  modifierCanceled() {
    this.clearSearch()

    this.allCalls = this.tempCalls;
    if (this.selectedMissed) this.selectMissed();
    else
      this.selectAll()
    this.modifierSelected = false;
  }

  deleteCall(index) {
    let i
    for (let key in this.allCalls) {
      if (this.allCalls[key].userName == this.calls[index].userName)
        i = key;
    }
    // this.calls.splice(index, 1)
    this.allCalls.splice(i, 1);
    if (this.selectedMissed) this.calls.splice(index, 1)

    this.clearSearch()
  }

  selectAll() {
    this.clearSearch()
    this.selectedAll = true;
    this.selectedMissed = false;
    this.calls = this.allCalls;
  }

  selectMissed() {
    this.clearSearch()
    this.selectedAll = false;
    this.selectedMissed = true;
    this.calls = [];
    this.allCalls.map(a => {
      if (a.missedState == '1')
        this.calls.push(a)
    })
  }

}
function search(array, value) {
  var returnValue = [];
  var arry = array;
  arry.map(function (y) {
    var index = y.userName.toLowerCase().indexOf(value.toLowerCase());
    if (index !== -1) {
      returnValue.push(y);
    }
  })

  return returnValue;


}

  // allCalls = [
  //   { Profile_pic: "assets/images/slide.jpeg", userName: "Brian henry", callKind: "videocam", date: '16/4/2018', time: '14:19', outIn: 'out', missedState: '1' },
  //   { Profile_pic: "assets/images/slide.jpeg", userName: "Elia henry", callKind: "videocam", date: '16/4/2018', time: '14:19', outIn: 'out', missedState: '1' },
  //   { Profile_pic: "assets/images/slide.jpeg", userName: "Yves mark", callKind: "call", date: '16/4/2018', time: '14:20', outIn: 'in', missedState: '0' }
  // ]
