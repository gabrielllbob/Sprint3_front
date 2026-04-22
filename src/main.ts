import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // 👈 Adicione withInterceptors
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth.interceptor'; // 👈 Importe o interceptor

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]) // 👈 Registre o interceptor aqui
    ),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));