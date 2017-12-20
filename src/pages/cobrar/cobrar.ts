import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController } from 'ionic-angular';
import { Principal } from '../../providers/auth/principal.service';
import { FirstRunPage } from '../pages';
import { LoginService } from '../../providers/login/login.service';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Cuenta, CuentaService} from '../entities/cuenta';
import {EstadoMensaje, Mensaje, TipoMensaje} from '../entities/mensaje';
import {User} from '../../models/index';

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
  cuentas: Cuenta[];

  cobro: {cliente: string, descripcion: string, monto: number, cuentaDestino: string, cobrador: string} = {
    cliente: null,
    descripcion: null,
    monto: null,
    cuentaDestino: null,
    cobrador: null
  }

  displayCobro = false;

  qrData = null;
  createdCode = '';
  scannedCode = null;

  constructor(public navCtrl: NavController,
              private principal: Principal,
              private app: App,
              private loginService: LoginService,
              private barcodeScanner: BarcodeScanner,
              private cuentaService: CuentaService) { }

  ngOnInit() {
    this.principal.identity().then((account) => {
      if (account === null) {
        this.app.getRootNavs()[0].setRoot(FirstRunPage);
      } else {
        this.account = account;
        this.dataInfo = account;
        this.cuentaService.query()
          .subscribe(data => { this.cuentas = data; }, (error) => console.error(error));
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
      this.cobro.cobrador = this.dataInfo.login;
      let message = JSON.stringify(this.cobro);
      console.log(message);
      this.createdCode = message;
    }
  }

  ocultarCodigo() {
    this.createdCode = null;
  }

  cleanAll() {
    this.cobro.cliente = null;
    this.cobro.descripcion = null;
    this.cobro.monto = null;
    this.cobro.cuentaDestino = null;
    this.cobro.cobrador = null;
    this.cuentaService.query()
      .subscribe(data => { this.cuentas = data; }, (error) => console.error(error));
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

  enviarMensajeCobro() {
    let mensaje = new Mensaje();
    mensaje.tipo = TipoMensaje.COBRO;
    mensaje.estado = EstadoMensaje.ENVIADO;
    mensaje.descripcion = this.cobro.descripcion;
    mensaje.monto = this.cobro.monto;
    let emisor = new User()
    emisor.login = this.dataInfo.login;
    mensaje.emisor = emisor;
    //let cuentaEmisor = new Cuenta
    //mensaje.cuentaEmisor = this.cobro.cuentaDestino
  }
}
