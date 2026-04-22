export interface Cliente {
  ideCliente?: number;
  nomCliente: string;
  nroCPF: string;
  nomEndereco: string;
  dtcNascimento: string;
  stsAtivo?: boolean;
  senhaHash?: string; 
  role?: string;
}