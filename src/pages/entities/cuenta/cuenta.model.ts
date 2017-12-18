import { BaseEntity, User } from './../../../models';

export class Cuenta implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public cbu?: string,
        public aliasCbu?: string,
        public banco?: string,
        public saldo?: number,
        public user?: User,
    ) {
    }
}
