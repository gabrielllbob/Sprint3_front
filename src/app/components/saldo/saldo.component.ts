import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransacaoService } from '../../services/transacao.service';
import { AuthService } from '../../services/auth.service';
import { Conta } from '../../models/conta';

@Component({
  selector: 'app-saldo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './saldo.component.html'
})
export class SaldoComponent implements OnInit {
  
  contas: Conta[] = [];
  
  // Controle do Modal
  modalAberto: boolean = false;
  contaOrigem: Conta | null = null;
  
  // Adicionamos 'CRIAR_CONTA' e 'CRIAR_CARTAO'
  tipoOperacao: 'SAQUE' | 'DEPOSITO' | 'TRANSFERENCIA' | 'CRIAR_CONTA' | 'CRIAR_CARTAO' | 'EXTRATO' = 'SAQUE';

  extrato: any[] = [];

  // Campos dos Formulários
  valor: number | null = null;
  numeroContaDestino: string = '';
  
  // Novos campos para Conta e Cartão
  novoTipoConta: string = 'Corrente';
  novoTipoCartao: string = 'Debito';
  novoSaldoInicial: number = 0;

  // Mensagens
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private transacaoService: TransacaoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarContas();
  }

  carregarContas() {
    const cpfLogado = localStorage.getItem('cpf'); 

    if (cpfLogado) {
      this.transacaoService.getContasDoUsuario(cpfLogado).subscribe({
        next: (dados) => { this.contas = dados; },
        error: (err) => {
          this.mensagemErro = 'Erro ao carregar contas do banco de dados.';
          console.error(err);
        }
      });
    }
  }

  // MODAL - Operações de Saldo
  abrirModal(conta: Conta, operacao: 'SAQUE' | 'DEPOSITO' | 'TRANSFERENCIA') {
    this.contaOrigem = conta;
    this.tipoOperacao = operacao;
    this.resetarFormulario();
    this.modalAberto = true;
  }

  // MODAL - Criar Nova Conta
  abrirModalCriarConta() {
    this.tipoOperacao = 'CRIAR_CONTA';
    this.contaOrigem = null;
    this.novoTipoConta = 'Corrente';
    this.novoSaldoInicial = 0; // 👈 ZERA O VALOR AQUI
    this.resetarFormulario();
    this.modalAberto = true;
  }

  // MODAL - Criar Novo Cartão
  abrirModalCriarCartao(conta: Conta) {
    this.tipoOperacao = 'CRIAR_CARTAO';
    this.contaOrigem = conta;
    this.novoTipoCartao = 'Debito';
    this.resetarFormulario();
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.contaOrigem = null;
  }

  resetarFormulario() {
    this.valor = null;
    this.numeroContaDestino = '';
    this.mensagemErro = '';
    this.mensagemSucesso = '';
  }

  // CONFIRMAÇÕES
  confirmarOperacao() {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.valor || this.valor <= 0) {
      this.mensagemErro = 'Digite um valor maior que zero.';
      return;
    }

    if (this.tipoOperacao === 'TRANSFERENCIA' && !this.numeroContaDestino) {
      this.mensagemErro = 'Digite o número da conta de destino.';
      return;
    }

    if (this.tipoOperacao !== 'DEPOSITO' && this.valor > (this.contaOrigem?.saldo || 0)) {
      this.mensagemErro = 'Saldo insuficiente na conta ' + this.contaOrigem?.tipoConta;
      return;
    }

    // 🔥 MAPA DE CONVERSÃO (CORREÇÃO PRINCIPAL)
    const mapaTipos: any = {
      SAQUE: 'Saque',
      DEPOSITO: 'Depósito',
      TRANSFERENCIA: 'Transferência'
    };

    const dadosOperacao = {
      contaOrigemId: this.contaOrigem?.id,
      tipoTransacao: this.tipoOperacao,   // 🔥 PADRÃO C#
      valor: this.valor,
      contaFinalId: this.tipoOperacao === 'TRANSFERENCIA' ? this.numeroContaDestino : null
    };

    this.transacaoService.realizar(dadosOperacao).subscribe({
      next: () => {
        this.mensagemSucesso = `${this.tipoOperacao} realizado com sucesso!`;
        this.carregarContas();
        setTimeout(() => this.fecharModal(), 2000);
      },
      error: (erro) => {
        this.mensagemErro = 'Erro ao processar a operação.';
        console.error(erro);
      }
    });
  }

  confirmarCriacaoConta() {
    this.mensagemErro = '';
    this.mensagemSucesso = '';
    const cpfLogado = localStorage.getItem('cpf');

    if (!cpfLogado) {
      this.mensagemErro = 'Erro de autenticação. Faça login novamente.';
      return;
    }

    // 👇 CHAMA A API PASSANDO O NOVO SALDO 👇
    this.transacaoService.criarConta(cpfLogado, this.novoTipoConta, this.novoSaldoInicial).subscribe({
      next: (resposta) => {
        this.mensagemSucesso = resposta.message;
        setTimeout(() => {
          this.fecharModal();
          this.carregarContas(); 
        }, 1500);
      },
      error: (erro) => {
        this.mensagemErro = 'Erro ao criar conta. Verifique os dados.';
        console.error(erro);
      }
    });
  }

  confirmarCriacaoCartao() {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.contaOrigem || !this.contaOrigem.id) {
      this.mensagemErro = 'Nenhuma conta selecionada.';
      return;
    }

    this.transacaoService.criarCartao(this.contaOrigem.id, this.novoTipoCartao).subscribe({
      next: (resposta) => {
        // Exibe a mensagem de sucesso
        this.mensagemSucesso = resposta.message;
        
        // Espera 1.5 segundos, fecha o modal e 👇 RECARREGA OS DADOS 👇
        setTimeout(() => {
          this.fecharModal();
          this.carregarContas(); // É esta linha que faz a mágica de atualizar a tela!
        }, 1500);
      },
      error: (erro) => {
        // Pega a mensagem de erro amigável que fizemos no C# (ex: Já possui cartão)
        this.mensagemErro = erro.error?.message || 'Erro ao tentar criar o cartão. Tente novamente.';
        console.error('Erro na criação do cartão:', erro);
      }
    });
  }

  abrirModalExtrato(conta: Conta) {
    this.transacaoService.getExtrato(conta.id).subscribe({
      next: (dados) => {
        this.extrato = dados;
        this.contaOrigem = conta;
        this.tipoOperacao = 'EXTRATO';
        this.modalAberto = true;
      },
      error: () => this.mensagemErro = 'Erro ao carregar o extrato.'
    });
  }
}