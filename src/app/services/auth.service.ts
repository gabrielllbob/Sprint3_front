import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL da sua API C# (verifique se a porta é 5168)
  private apiUrl = `${environment.apiUrl}/Auth/login`;

  constructor(private http: HttpClient) { }

  // AGORA É REAL: Envia CPF e Senha para o C#
  fazerLogin(cpf: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { cpf, senha }).pipe(
      tap(resposta => {
        // Se o C# responder OK, guardamos a ROLE que veio do BANCO DE DADOS
        localStorage.setItem('token', resposta.token);
        localStorage.setItem('role', resposta.role);
        localStorage.setItem('cpf', resposta.cpf);
        console.log('Role vinda do banco:', resposta.role);
      })
    );
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }
}