import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// 1. Importe estas funções
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// 2. Importe o seu interceptor (ajuste o caminho se necessário)
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // 3. Registre o interceptor aqui dentro
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};