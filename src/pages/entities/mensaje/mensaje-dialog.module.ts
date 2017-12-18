import { CuentaService } from '../cuenta';
import { User as UserService } from '../../../providers/user/user';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { MensajeDialogPage } from './mensaje-dialog';
import { MensajeService } from './mensaje.provider';

@NgModule({
    declarations: [
        MensajeDialogPage
    ],
    imports: [
        IonicPageModule.forChild(MensajeDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        MensajeDialogPage
    ],
    providers: [
        MensajeService,
        CuentaService,
        UserService,
    ]
})
export class MensajeDialogPageModule {
}
