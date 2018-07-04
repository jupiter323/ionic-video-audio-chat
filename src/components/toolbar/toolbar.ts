import { Component } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.html'
})
export class ToolbarComponent {

  pageName: string;


  constructor() {
    this.pageName = 'Settings'

  }

}
