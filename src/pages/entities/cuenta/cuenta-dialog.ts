import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Cuenta } from './cuenta.model';
import { CuentaService } from './cuenta.provider';
import { User } from '../../../models/user.model';
import { User as UserService } from '../../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-cuenta-dialog',
    templateUrl: 'cuenta-dialog.html'
})
export class CuentaDialogPage {

    cuenta: Cuenta;
    users: User[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController,
                formBuilder: FormBuilder, params: NavParams,
                private userService: UserService,
                private cuentaService: CuentaService) {
        this.cuenta = params.get('item');
        if (this.cuenta != null && this.cuenta !== null && typeof this.cuenta !== 'undefined') {
            if (this.cuenta.id) {
                this.cuentaService.find(this.cuenta.id).subscribe(data => {
                    this.cuenta = data;
                });
            }
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.cuenta.id : ''],
            nombre: [params.get('item') ? this.cuenta.nombre : '', ],
            cbu: [params.get('item') ? this.cuenta.cbu : '',  Validators.required],
            aliasCbu: [params.get('item') ? this.cuenta.aliasCbu : '', ],
            banco: [params.get('item') ? this.cuenta.banco : '', ],
            saldo: [params.get('item') ? this.cuenta.saldo : '',  Validators.required],
            user: [params.get('item') ? this.cuenta.user : '', ],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
        this.userService.findAll().subscribe(data => this.users = data);
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the cuenta, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    /*private onError(error) {
        console.error(error);
        // todo: use toaster, this.jhiAlertService.error(error.message, null, null);
    }*/

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
