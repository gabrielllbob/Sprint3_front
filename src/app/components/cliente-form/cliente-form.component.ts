import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service'; // Ajuste o caminho se necessário
import { Cliente } from '../../models/cliente'; // Ajuste o caminho se necessário
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cliente-form.component.html' // Certifique-se de que o nome do HTML bate
})
export class ClienteFormComponent implements OnInit {
  
  // Objeto inicial vazio (com valores padrão para não dar erro)
  cliente: Cliente = {
    nomCliente: '',
    nroCPF: '',
    nomEndereco: '',
    dtcNascimento: '',
    role: 'CLIENTE',
    senhaHash: ''
  };

  isEdicao: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Tenta pegar o ID da URL (ex: /clientes/editar/4)
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdicao = true;
      
      // Chama o serviço para buscar os dados no banco
      this.clienteService.getById(Number(id)).subscribe({
        next: (dados) => {
          this.cliente = dados; // Preenche o formulário
          
          // Tratamento para a data aparecer corretamente no input type="date" (YYYY-MM-DD)
          if (this.cliente.dtcNascimento) {
            this.cliente.dtcNascimento = new Date(this.cliente.dtcNascimento)
              .toISOString().split('T')[0];
          }
        },
        error: (err) => {
          console.error('Erro ao buscar o cliente na API', err);
          alert('Não foi possível carregar os dados deste cliente.');
        }
      });
    }
  }

  salvar(): void {
    if (this.isEdicao) {
      // Se tiver ID na URL, é uma atualização (PUT)
      this.clienteService.update(this.cliente).subscribe({
        next: () => {
          alert('Cliente atualizado com sucesso!');
          this.router.navigate(['/clientes']); // Volta para a lista
        },
        error: (err) => console.error('Erro ao atualizar', err)
      });
    } else {
      // Se não tiver ID na URL, é uma criação (POST)
      this.clienteService.create(this.cliente).subscribe({
        next: () => {
          alert('Cliente criado com sucesso!');
          this.router.navigate(['/clientes']); // Volta para a lista
        },
        error: (err) => console.error('Erro ao criar', err)
      });
    }
  }
}