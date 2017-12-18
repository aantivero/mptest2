import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Mensaje } from './mensaje.model';

@Injectable()
export class MensajeService {
    private resourceUrl = Api.API_URL + '/mensajes';

    constructor(private http: HttpClient) { }

    create(mensaje: Mensaje): Observable<Mensaje> {
        return this.http.post(this.resourceUrl, mensaje);
    }

    update(mensaje: Mensaje): Observable<Mensaje> {
        return this.http.put(this.resourceUrl, mensaje);
    }

    find(id: number): Observable<Mensaje> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
