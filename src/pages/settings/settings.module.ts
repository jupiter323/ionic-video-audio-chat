import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { ToolbarComponent } from '../../components/toolbar/toolbar';

@NgModule({
  declarations: [
    SettingsPage,
    ToolbarComponent
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
  ],
})
export class SettingsPageModule {}
