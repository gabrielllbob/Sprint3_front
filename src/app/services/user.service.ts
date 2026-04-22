import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Transacao } from '../models/transacao';

@Injectable({ providedIn: 'root' })
export class TransacaoService {
  private url = `${environment.apiUrl}/Transacoes`;

  constructor(private http: HttpClient) { }

  realizar(transacao: Transacao): Observable<any> {
    return this.http.post(this.url, transacao);
  }
}