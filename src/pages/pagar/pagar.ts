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
  selector: 'page-pagar',
  templateUrl: 'pagar.html'
})
export class PagarPage implements OnInit {
  account: Account;
  dataInfo: MyAccount;

  displayCobro = false;

  qrData = null;
  createdCode = '';
  codigoAPagar = 'test: algo; saludo: 000';
  codigoPagador = '';

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

  crearCodigoPagador() {
    if (this.account !== null && this.dataInfo !== null) {
      this.codigoPagador = this.dataInfo.login;
    }
  }

  ocultarCodigoPagador() {
    this.codigoPagador = null;
  }

  escanearCodigoAPagar() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.codigoAPagar = barcodeData.text;
    }, (err) => {
      console.log('Error: ', err);
    })
  }

}
