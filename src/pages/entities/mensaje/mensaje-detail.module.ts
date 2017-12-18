import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { MensajeDetailPage } from './mensaje-detail';
import { MensajeService } from './mensaje.provider';

@NgModule({
    declarations: [
        MensajeDetailPage
    ],
    imports: [
        IonicPageModule.forChild(MensajeDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        MensajeDetailPage
    ],
    providers: [MensajeService]
})
export class MensajeDetailPageModule {
}
