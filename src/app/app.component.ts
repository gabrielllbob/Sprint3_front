import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Router, RouterLink } from '@angular/router'; // 👈 Importe o Router
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink], 
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Sprint3-FrontEnd';

  // O authService continua public para o HTML conseguir ler
  constructor(public authService: AuthService, private router: Router) {}

  // 👇 Método que o botão "Sair" do HTML vai chamar
  sair() {
    this.authService.logout(); // Limpa o banco/token do navegador
    this.router.navigate(['/login']); // Volta pra tela de login
  }
}