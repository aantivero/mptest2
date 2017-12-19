import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PagarPage } from './pagar';
import {NgxQRCodeModule} from 'ngx-qrcode2';

@NgModule({
  declarations: [
    PagarPage
  ],
  imports: [
    IonicPageModule.forChild(PagarPage),
    TranslateModule.forChild(),
    NgxQRCodeModule
  ],
  exports: [
    PagarPage
  ]
})
export class PagarPageModule { }
