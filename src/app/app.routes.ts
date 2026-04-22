import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { TransacaoFormComponent } from './components/transacao-form/transacao-form.component';
import { LoginComponent } from './components/login/login.component';
import { SaldoComponent } from './components/saldo/saldo.component';

// Importando os Guardiões
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  // Rota do cliente comum: Protegida pelo authGuard (só precisa estar logado)
  { path: 'saldo', component: SaldoComponent, canActivate: [authGuard] },

  // Rotas de Administração: Protegidas pelo adminGuard (precisa ser ADMIN)
  { path: 'clientes', component: ClienteListComponent, canActivate: [adminGuard] },
  { path: 'clientes/novo', component: ClienteFormComponent, canActivate: [adminGuard] },
  { path: 'clientes/editar/:id', component: ClienteFormComponent, canActivate: [adminGuard] },
  { path: 'transacoes/nova', component: TransacaoFormComponent, canActivate: [adminGuard] }
];