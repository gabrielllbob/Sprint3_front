import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se estiver logado, deixa passar
  if (authService.isLoggedIn()) {
    return true;
  }

  // Se não estiver, bloqueia e manda pro login
  router.navigate(['/login']);
  return false;
};