import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Transacao } from '../models/transacao';
import { Conta } from '../models/conta'; // 👈 Importação da interface Conta

@Injectable({ providedIn: 'root' })
export class TransacaoService {
  
  // Suas URLs baseadas no environment
  private urlTransacoes = `${environment.apiUrl}/Transacoes`;
  private urlContas = `${environment.apiUrl}/Contas`; // 👈 Rota para as contas

  constructor(private http: HttpClient) { }

  // 1. O SEU MÉTODO ORIGINAL MANTIDO (Faz a transferência, saque ou depósito)
  // Deixei como (transacao: Transacao | any) para aceitar o formato do modal
  realizar(dadosOperacao: any): Observable<any> {
    const url = `${environment.apiUrl}/Transacoes/realizar`;
    return this.http.post<any>(url, dadosOperacao);
  }

  // 2. NOVO MÉTODO (Busca Corrente, Poupança e Empresarial do C#)
  getContasDoUsuario(clienteCpf: string): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.urlContas}/minhas-contas/${clienteCpf}`);
  }

  criarConta(cpf: string, tipoConta: string, saldoInicial: number): Observable<any> {
    const url = `${environment.apiUrl}/Contas/criar`;
    // Envia o saldoInicial junto no JSON
    return this.http.post<any>(url, { cpf, tipoConta, saldoInicial });
  }

  criarCartao(contaId: number, tipoCartao: string): Observable<any> {
    const url = `${environment.apiUrl}/Cartoes/criar`;
    return this.http.post<any>(url, { contaId, tipoCartao });
  }

  getExtrato(contaId: number): Observable<any[]> {
    const url = `${environment.apiUrl}/Transacoes/extrato/${contaId}`;
    return this.http.get<any[]>(url);
  }
}