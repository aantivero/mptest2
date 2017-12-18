import { Cuenta } from './../cuenta/cuenta.model';
import { BaseEntity, User } from './../../../models';

export const enum EstadoMensaje {
    'CREADO',
    ' ENVIADO',
    ' ACEPTADO',
    ' RECHAZADO'
}

export const enum TipoMensaje {
    'COBRO',
    ' PAGO',
    ' DEBITO',
    ' CREDITO'
}

export class Mensaje implements BaseEntity {
    constructor(
        public id?: number,
        public estado?: EstadoMensaje,
        public descripcion?: string,
        public monto?: number,
        public comentario?: string,
        public motivo?: string,
        public tipo?: TipoMensaje,
        public cuentaEmisor?: Cuenta,
        public cuentaReceptor?: Cuenta,
        public emisor?: User,
        public receptor?: User,
    ) {
    }
}
