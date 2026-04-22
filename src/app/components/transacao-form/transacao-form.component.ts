import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TransacaoService } from '../../services/transacao.service';
import { Transacao } from '../../models/transacao';

@Component({
  selector: 'app-transacao-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transacao-form.component.html'
})
export class TransacaoFormComponent {
  transacao: Transacao = {
    tipoTransacao: 'Transferência',
    valor: 0,
    contaOrigemId: 0,
    contaFinalId: 0
  };

  constructor(private transacaoService: TransacaoService, private router: Router) { }

  executar(): void {
    this.transacaoService.realizar(this.transacao).subscribe({
      next: (res) => {
        alert('Sucesso: ' + res.message);
        this.router.navigate(['/clientes']);
      },
      error: (erro) => {
        alert('Erro na transação: ' + (erro.error?.details || erro.error?.error || 'Verifique os dados e o saldo.'));
      }
    });
  }
}