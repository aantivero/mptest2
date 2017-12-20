import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PagarPage } from './pagar';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {CuentaService} from '../entities/cuenta';
import {MensajeService} from '../entities/mensaje';

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
  ],
  providers: [
    CuentaService,
    MensajeService
  ]
})
export class PagarPageModule { }
