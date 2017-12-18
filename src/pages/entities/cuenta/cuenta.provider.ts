import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Cuenta } from './cuenta.model';

@Injectable()
export class CuentaService {
    private resourceUrl = Api.API_URL + '/cuentas';

    constructor(private http: HttpClient) { }

    create(cuenta: Cuenta): Observable<Cuenta> {
        return this.http.post(this.resourceUrl, cuenta);
    }

    update(cuenta: Cuenta): Observable<Cuenta> {
        return this.http.put(this.resourceUrl, cuenta);
    }

    find(id: number): Observable<Cuenta> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
