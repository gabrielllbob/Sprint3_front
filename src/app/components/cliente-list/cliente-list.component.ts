import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service'; // Ajuste o caminho se necessário
import { Cliente } from '../../models/cliente'; // Ajuste o caminho se necessário
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente-list.component.html'
})
export class ClienteListComponent implements OnInit {
  
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    // 👇 Mudamos de listar() para getAll() 👇
    this.clienteService.getAll().subscribe({
      next: (dados: Cliente[]) => { // O Angular agora sabe que "dados" é um array de Cliente
        this.clientes = dados;
      },
      error: (err) => console.error('Erro ao carregar clientes', err)
    });
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      // 👇 Mudamos de deletar() para delete() 👇
      this.clienteService.delete(id).subscribe({
        next: () => {
          alert('Cliente excluído com sucesso!');
          this.carregarClientes(); // Recarrega a lista após excluir
        },
        error: (err) => console.error('Erro ao excluir cliente', err)
      });
    }
  }
}