// Você pode criar essa interface de Cartão aqui mesmo no topo do arquivo
export interface Cartao {
  numeroCartao: string;
  tipoCartao: string; // 👈 INCLUIR ESTA LINHA
  via: number;
  dataVencimento: string;
}

export interface Conta {
  id: number;
  numeroConta: string;
  tipoConta: string;
  saldo: number;
  
  // 👇 BASTA ADICIONAR ESTA LINHA 👇
  cartoes?: Cartao[]; 
}