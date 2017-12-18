import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Cuenta } from './cuenta.model';
import { CuentaService } from './cuenta.provider';
import { User } from '../../../models/index';

@IonicPage()
@Component({
    selector: 'page-cuenta',
    templateUrl: 'cuenta.html'
})
export class CuentaPage {
    cuentas: Cuenta[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private cuentaService: CuentaService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.cuentas = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll() {
        this.cuentaService.query().subscribe(
            (response) => this.onSuccess(response),
            (error) => this.onError(error));
    }

    private onSuccess(data) {
        this.cuentas = data;
    }

    private onError(error) {
        console.error(error);
        // todo: use toaster, this.jhiAlertService.error(error.message, null, null);
    }

    trackId(index: number, item: Cuenta) {
        return item.id;
    }

    open(slidingItem: any, item: Cuenta) {
        if (item ==null || item === null || item == 'undefined') {
            item = new Cuenta();
            item.user = new User();
            item.user.login = 'control1';
        }
        let modal = this.modalCtrl.create('CuentaDialogPage', {item: item});
        modal.onDidDismiss(cuenta => {
            if (cuenta) {
                if (cuenta.id) {
                    this.cuentaService.update(cuenta).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Cuenta updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.cuentaService.create(cuenta).subscribe(data => {
                        this.cuentas.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Cuenta added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(cuenta) {
        this.cuentaService.delete(cuenta.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Cuenta deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(cuenta: Cuenta) {
        this.navCtrl.push('CuentaDetailPage', {id: cuenta.id});
    }
}
