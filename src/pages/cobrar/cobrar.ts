import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController } from 'ionic-angular';
import { Principal } from '../../providers/auth/principal.service';
import { FirstRunPage } from '../pages';
import { LoginService } from '../../providers/login/login.service';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

interface MyAccount extends Account{
  login?: string
}

@IonicPage()
@Component({
  selector: 'page-cobrar',
  templateUrl: 'cobrar.html'
})
export class CobrarPage implements OnInit {
  account: Account;
  dataInfo: MyAccount;

  cobro: {cliente: string, descripcion: string, monto: number} = {
    cliente: null,
    descripcion: null,
    monto: null
  }

  displayCobro = false;

  qrData = null;
  createdCode = '';
  scannedCode = null;

  constructor(public navCtrl: NavController,
              private principal: Principal,
              private app: App,
              private loginService: LoginService,
              private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.principal.identity().then((account) => {
      if (account === null) {
        this.app.getRootNavs()[0].setRoot(FirstRunPage);
      } else {
        this.account = account;
        this.dataInfo = account;
      }
    });
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.app.getRootNavs()[0].setRoot(FirstRunPage);
  }

  createCode() {
    if (this.account !== null && this.dataInfo !== null) {
      let message = `cobrador: ${this.dataInfo.login}; descripcion: ${this.cobro.descripcion}; monto: ${this.cobro.monto}`;
      this.createdCode = message;
    }
  }

  ocultarCodigo() {
    this.createdCode = null;
  }

  scanClientCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.cobro.cliente = barcodeData.text;
    }, (err) => {
      console.log('Error: ', err);
    })
  }

  isDisplayCobro() {
    if (this.cobro.cliente && this.cobro.monto) {
      console.log(this.cobro.cliente);
      console.log(this.cobro.monto);
      return true;
    } else {
      return false;
    }
  }
}
