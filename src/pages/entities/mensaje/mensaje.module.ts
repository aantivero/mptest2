import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { MensajePage } from './mensaje';
import { MensajeService } from './mensaje.provider';

@NgModule({
    declarations: [
        MensajePage
    ],
    imports: [
        IonicPageModule.forChild(MensajePage),
        TranslateModule.forChild()
    ],
    exports: [
        MensajePage
    ],
    providers: [MensajeService]
})
export class MensajePageModule {
}
