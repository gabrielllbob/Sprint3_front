import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente'; // Verifique se esta pasta está correta no seu projeto

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  // URL da sua API (porta 5168 conforme seus logs anteriores)
  private apiUrl = 'http://localhost:5168/api/Clientes'; 

  constructor(private http: HttpClient) { }

  // Lista todos os clientes
  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // Busca um cliente específico pelo ID (O MÉTODO QUE FALTAVA)
  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // Cria um novo cliente
  create(cliente: Cliente): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  // Atualiza um cliente existente
  update(cliente: Cliente): Observable<any> {
    return this.http.put(this.apiUrl, cliente);
  }

  // Deleta um cliente
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}