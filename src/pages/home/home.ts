import { CuentaService } from './../entities/cuenta/cuenta.provider';
import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController } from 'ionic-angular';
import { Principal } from '../../providers/auth/principal.service';
import { FirstRunPage } from '../pages';
import { LoginService } from '../../providers/login/login.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Cuenta } from '../entities/cuenta/index';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  account: Account;

  cuentas: Cuenta[];

  qrData = null;
  createdCode = '';
  scannedCode = null;

  constructor(public navCtrl: NavController,
              private principal: Principal,
              private app: App,
              private loginService: LoginService,
              private barcodeScanner: BarcodeScanner,
              private cuentaService: CuentaService) {
    this.cuentas = [];
  }

  ngOnInit() {
    this.principal.identity().then((account) => {
      if (account === null) {
        this.app.getRootNavs()[0].setRoot(FirstRunPage);
      } else {
        this.account = account;
        this.loadAll();
      }
    });
  }

  refresh() {
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

  getSaldoTotal() {
    let suma = 0;
    for (let i = 0; i < this.cuentas.length; i++) {
      suma += this.cuentas[i].saldo;  
    }
    return suma;
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.app.getRootNavs()[0].setRoot(FirstRunPage);
  }

  createCode() {
    this.createdCode = this.qrData;
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
      console.log('Error: ', err);
    })
  }
}
