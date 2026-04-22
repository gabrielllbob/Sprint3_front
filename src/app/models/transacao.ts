export interface Transacao {
  tipoTransacao: string;
  valor: number;
  contaOrigemId: number;
  contaFinalId: number;
}