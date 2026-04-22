import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se estiver logado E for ADMIN, deixa passar
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  // Se não for Admin (ou não estiver logado), manda pro login
  alert('Acesso negado! Área restrita para administradores.');
  router.navigate(['/login']);
  return false;
};