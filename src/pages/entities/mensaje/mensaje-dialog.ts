import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Mensaje } from './mensaje.model';
import { MensajeService } from './mensaje.provider';
import { Cuenta, CuentaService } from '../cuenta';
import { User } from '../../../models/user.model';
import { User as UserService } from '../../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-mensaje-dialog',
    templateUrl: 'mensaje-dialog.html'
})
export class MensajeDialogPage {

    mensaje: Mensaje;
    cuentas: Cuenta[];
    users: User[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController,
                formBuilder: FormBuilder, params: NavParams,
                private cuentaService: CuentaService,
                private userService: UserService,
                private mensajeService: MensajeService) {
        this.mensaje = params.get('item');
       
        if (this.mensaje != null && this.mensaje !== null && typeof this.mensaje !== 'undefined') {
            if ( this.mensaje.id) {
                this.mensajeService.find(this.mensaje.id).subscribe(data => {
                    this.mensaje = data;
                });
            }
        }
        

        this.form = formBuilder.group({
            id: [params.get('item') ? this.mensaje.id : ''],
            estado: [params.get('item') ? this.mensaje.estado : '',  Validators.required],
            descripcion: [params.get('item') ? this.mensaje.descripcion : '', ],
            monto: [params.get('item') ? this.mensaje.monto : '', ],
            comentario: [params.get('item') ? this.mensaje.comentario : '', ],
            motivo: [params.get('item') ? this.mensaje.motivo : '', ],
            tipo: [params.get('item') ? this.mensaje.tipo : '',  Validators.required],
            cuentaEmisor: [params.get('item') ? this.mensaje.cuentaEmisor : '',],
            emisor: [params.get('item') ? this.mensaje.emisor : '',],
            cuentaReceptor: [params.get('item') ? this.mensaje.cuentaReceptor : '',],
            receptor: [params.get('item') ? this.mensaje.receptor : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
        this.cuentaService.query()
            .subscribe(data => { this.cuentas = data; }, (error) => this.onError(error));
        this.userService.findAll().subscribe(data => this.users = data);
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the mensaje, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    private onError(error) {
        console.error(error);
        // todo: use toaster, this.jhiAlertService.error(error.message, null, null);
    }

    compareCuenta(first: Cuenta, second: Cuenta): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCuentaById(index: number, item: Cuenta) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
