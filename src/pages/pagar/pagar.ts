import { Component, OnInit } from '@angular/core';
import {App, IonicPage, NavController, ToastController} from 'ionic-angular';
import { Principal } from '../../providers/auth/principal.service';
import { FirstRunPage } from '../pages';
import { LoginService } from '../../providers/login/login.service';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Cuenta, CuentaService} from '../entities/cuenta';
import {EstadoMensaje, Mensaje, MensajeService, TipoMensaje} from '../entities/mensaje';
import {User} from '../../models/index';

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
  codigoAPagar: any;//'{"cliente":"admin","descripcion":"llll","monto":"1230","cuentaDestino":{"id":4254,"nombre":"cuentaUser1002","cbu":"3333333333333333333333","aliasCbu":"AliasCuentaUser1002","banco":"Galicia","saldo":2500,"user":{"id":4,"login":"user","firstName":"User","lastName":"User","email":"user@localhost","activated":true,"langKey":"es","imageUrl":"","resetDate":null}},"cobrador":"user"}';
  codigoPagador = '';
  comentario = '';
  cuentas: Cuenta[];
  mostrarCabecera = true;
  cuenta = null;

  constructor(public navCtrl: NavController,
              private principal: Principal,
              private app: App,
              private loginService: LoginService,
              private barcodeScanner: BarcodeScanner,
              private cuentaService: CuentaService,
              private mensajeService: MensajeService,
              private toastCtrl: ToastController) { }

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
      this.mostrarCabecera = false;
    }
  }

  ocultarCodigoPagador() {
    this.codigoPagador = null;
    this.mostrarCabecera = true;
  }

  escanearCodigoAPagar2() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.codigoAPagar = barcodeData.text;
    }, (err) => {
      console.log('Error: ', err);
    })
  }

  escanearCodigoAPagar() {
    let data = '{"cliente":"user","descripcion":"dos cafe","monto":"100","cuentaDestino":{"id":4252,"nombre":"cuentaAdmin002","cbu":"2222222222222222222222","aliasCbu":"AliasCuentaAdmin002","banco":"Comafi","saldo":35965,"user":{"id":3,"login":"admin","firstName":"Administrator","lastName":"Administrator","email":"admin@localhost","activated":true,"langKey":"es","imageUrl":"","resetDate":null}},"cobrador":"admin"}';
    this.codigoAPagar = JSON.parse(data);
    this.cuentaService.query()
      .subscribe(data => { this.cuentas = data; }, (error) => console.error(error));
    this.mostrarCabecera = false;
  }

  aceptarCobro() {
    //armar y enviar el mensaje
    let mensaje = new Mensaje();
    console.log(EstadoMensaje.ACEPTADO);
    console.log(TipoMensaje.COBRO)
    mensaje.tipo = TipoMensaje.COBRO;
    mensaje.estado = EstadoMensaje.ACEPTADO;
    mensaje.descripcion = this.codigoAPagar.descripcion;
    mensaje.monto = this.codigoAPagar.monto;
    mensaje.comentario = this.comentario;
    let emisor = new User();
    emisor.login = this.codigoAPagar.cobrador;
    mensaje.emisor = emisor;
    mensaje.cuentaEmisor = this.codigoAPagar.cuentaDestino;
    let receptor = new User();
    receptor.login = this.codigoAPagar.cliente;
    mensaje.receptor = receptor;
    mensaje.cuentaReceptor = this.cuenta;
    console.log("ACEPTAR COBRO-->");
    console.log(mensaje);
    console.log("------------------");
    this.mensajeService.create(mensaje).subscribe( data => {
      let toast = this.toastCtrl.create({
        message: 'Pago realizado exitosamente', duration: 3000, position: 'middle'
      });
      this.mostrarCabecera = true;
      this.codigoAPagar = null;
      this.cuenta = null;
      toast.present();
    }, (error) => {
      console.error(error)
      let toast = this.toastCtrl.create({
        message: 'Error al realizar el pago', duration: 3000, position: 'middle'
      });
      toast.present();
    });

  }

  rechazarCobro() {
    //armar y enviar el mensaje
    let mensaje = new Mensaje();
    mensaje.tipo = TipoMensaje.COBRO;
    mensaje.estado = EstadoMensaje.RECHAZADO;
    mensaje.descripcion = this.codigoAPagar.descripcion;
    mensaje.monto = this.codigoAPagar.monto;
    mensaje.comentario = this.comentario;
    let emisor = new User();
    emisor.login = this.codigoAPagar.cobrador;
    mensaje.emisor = emisor;
    mensaje.cuentaEmisor = this.codigoAPagar.cuentaDestino;
    let receptor = new User();
    receptor.login = this.codigoAPagar.cliente;
    mensaje.receptor = receptor;

    console.log("CANCELAR COBRO-->");
    console.log(mensaje);
    console.log("------------------");
    this.mensajeService.create(mensaje).subscribe( data => {
      let toast = this.toastCtrl.create({
        message: 'Cancelar realizado exitosamente', duration: 3000, position: 'middle'
      });
      this.mostrarCabecera = true;
      this.codigoAPagar = null;
      this.cuenta = null;
      toast.present();
    }, (error) => {
      console.error(error)
      let toast = this.toastCtrl.create({
        message: 'Error al realizar la cancelacion', duration: 3000, position: 'middle'
      });
      toast.present();
    });

  }

}
