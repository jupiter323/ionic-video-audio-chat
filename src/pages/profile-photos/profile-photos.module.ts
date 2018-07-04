import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePhotosPage } from './profile-photos';

@NgModule({
  declarations: [
    ProfilePhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePhotosPage),
  ],
})
export class ProfilePhotosPageModule {}
