import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CobrarPage } from './cobrar';
import {NgxQRCodeModule} from 'ngx-qrcode2';

@NgModule({
  declarations: [
    CobrarPage
  ],
  imports: [
    IonicPageModule.forChild(CobrarPage),
    TranslateModule.forChild(),
    NgxQRCodeModule
  ],
  exports: [
    CobrarPage
  ]
})
export class CobrarPageModule { }
