import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CuentaDetailPage } from './cuenta-detail';
import { CuentaService } from './cuenta.provider';

@NgModule({
    declarations: [
        CuentaDetailPage
    ],
    imports: [
        IonicPageModule.forChild(CuentaDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        CuentaDetailPage
    ],
    providers: [CuentaService]
})
export class CuentaDetailPageModule {
}
