import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CuentaPage } from './cuenta';
import { CuentaService } from './cuenta.provider';

@NgModule({
    declarations: [
        CuentaPage
    ],
    imports: [
        IonicPageModule.forChild(CuentaPage),
        TranslateModule.forChild()
    ],
    exports: [
        CuentaPage
    ],
    providers: [CuentaService]
})
export class CuentaPageModule {
}
