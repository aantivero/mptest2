import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CobrarPage } from './cobrar';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {CuentaService} from '../entities/cuenta';

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
  ],
  providers: [
    CuentaService
  ]
})
export class CobrarPageModule { }
