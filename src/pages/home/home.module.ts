import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { HomePage } from './home';
import { CuentaService } from '../entities/cuenta/index';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild(),
    NgxQRCodeModule
  ],
  exports: [
    HomePage
  ],
  providers: [CuentaService]
})
export class HomePageModule { }
