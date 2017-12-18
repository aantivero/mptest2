import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController, App } from 'ionic-angular';
import { Cuenta } from './cuenta.model';
import { CuentaService } from './cuenta.provider';
import { Principal } from '../../../providers/auth/principal.service';
import { FirstRunPage } from '../../pages';
import { User } from '../../../models/index';

@IonicPage({
    segment: 'cuenta-detail/:id'
})
@Component({
    selector: 'page-cuenta-detail',
    templateUrl: 'cuenta-detail.html'
})
export class CuentaDetailPage {
    cuenta: Cuenta;

    constructor(private modalCtrl: ModalController, private params: NavParams,
                private cuentaService: CuentaService, private toastCtrl: ToastController,
                private principal: Principal,
                private app: App) {
        this.cuenta = new Cuenta();
        this.principal.identity().then((account) => {
            if (account === null) {
              this.app.getRootNavs()[0].setRoot(FirstRunPage);
            } else {
                this.cuenta.user = new User();
                this.cuenta.user.login = account.login;
            }
          });
         
        this.cuenta.id = params.get('id');
        console.log("-->" + this.cuenta);
    }

    ionViewDidLoad() {
        console.log("llamada 01");
        this.cuentaService.find(this.cuenta.id).subscribe(data => this.cuenta = data);
        console.log("llamada 01-B");
    }

    open(item: Cuenta) {
        console.log("llamada 02")
        let modal = this.modalCtrl.create('CuentaDialogPage', {item: item});
        modal.onDidDismiss(cuenta => {
            if (cuenta) {
                this.cuentaService.update(cuenta).subscribe(data => {
                    this.cuenta = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Cuenta updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
        console.log("llamada 02-B");
    }
}
