import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Adicionado para o *ngIf funcionar
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // 👈 Mantemos apenas o Router para navegar via código
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 Apenas o que o HTML da tela de Login realmente usa
  templateUrl: './login.component.html'
})
export class LoginComponent {
  cpf = '';
  senha = '';
  mensagemErro = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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