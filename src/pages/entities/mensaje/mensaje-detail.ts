import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Mensaje } from './mensaje.model';
import { MensajeService } from './mensaje.provider';

@IonicPage({
    segment: 'mensaje-detail/:id'
})
@Component({
    selector: 'page-mensaje-detail',
    templateUrl: 'mensaje-detail.html'
})
export class MensajeDetailPage {
    mensaje: Mensaje;

    constructor(private modalCtrl: ModalController, private params: NavParams,
                private mensajeService: MensajeService, private toastCtrl: ToastController) {
        this.mensaje = new Mensaje();
        this.mensaje.id = params.get('id');
    }

    ionViewDidLoad() {
        this.mensajeService.find(this.mensaje.id).subscribe(data => this.mensaje = data);
    }

    open(item: Mensaje) {
        let modal = this.modalCtrl.create('MensajeDialogPage', {item: item});
        modal.onDidDismiss(mensaje => {
            if (mensaje) {
                this.mensajeService.update(mensaje).subscribe(data => {
                    this.mensaje = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Mensaje updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
