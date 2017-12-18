import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Mensaje } from './mensaje.model';
import { MensajeService } from './mensaje.provider';
import { Cuenta } from '../cuenta/index';
import { User } from '../../../models/index';

@IonicPage()
@Component({
    selector: 'page-mensaje',
    templateUrl: 'mensaje.html'
})
export class MensajePage {
    mensajes: Mensaje[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private mensajeService: MensajeService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.mensajes = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll() {
        this.mensajeService.query().subscribe(
            (response) => this.onSuccess(response),
            (error) => this.onError(error));
    }

    private onSuccess(data) {
        this.mensajes = data;
    }

    private onError(error) {
        console.error(error);
        // todo: use toaster, this.jhiAlertService.error(error.message, null, null);
    }

    trackId(index: number, item: Mensaje) {
        return item.id;
    }

    open(slidingItem: any, item: Mensaje) {
        if (item ==null || item === null || item == 'undefined') {
            item = new Mensaje();
            item.cuentaEmisor = new Cuenta();
            item.cuentaEmisor.nombre = 'emisor';
            item.cuentaReceptor = new Cuenta();
            item.cuentaReceptor.nombre = 'receptor';
            item.receptor = new User();
        }
        let modal = this.modalCtrl.create('MensajeDialogPage', {item: item});
        modal.onDidDismiss(mensaje => {
            console.log(mensaje);
            let receptor = mensaje.receptor;
            mensaje.receptor = new User();
            mensaje.receptor.login = receptor;
            if (mensaje) {
                if (mensaje.id) {
                    this.mensajeService.update(mensaje).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Mensaje updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.mensajeService.create(mensaje).subscribe(data => {
                        this.mensajes.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Mensaje added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(mensaje) {
        this.mensajeService.delete(mensaje.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Mensaje deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(mensaje: Mensaje) {
        this.navCtrl.push('MensajeDetailPage', {id: mensaje.id});
    }
}
