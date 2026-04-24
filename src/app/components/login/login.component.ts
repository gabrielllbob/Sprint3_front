import { Component, OnInit } from '@angular/core'; // 1. Adicione OnInit aqui
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
// 2. Adicione "implements OnInit" na classe
export class LoginComponent implements OnInit {
  cpf = '';
  senha = '';
  mensagemErro = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // 3. Adicione este método
  ngOnInit(): void {
    // Sempre que a página de login carregar, força o logout
    this.authService.logout();
    console.log('Sessão limpa ao acessar o Login');
  }

  entrar() {
    this.authService.fazerLogin(this.cpf, this.senha).subscribe({
      next: (res) => {
        this.mensagemErro = '';
        
        if (this.authService.isAdmin()) {
          this.router.navigate(['/clientes']); 
        } else {
          this.router.navigate(['/saldo']); 
        }
      },
      error: (err) => {
        console.error('Falha no login', err);
        this.mensagemErro = 'CPF ou senha inválidos!';
      }
    });
  }
}