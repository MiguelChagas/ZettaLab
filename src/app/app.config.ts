import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

/**
 * Configuração principal da aplicação Angular
 * Define os providers globais necessários:
 * - provideRouter: configura o sistema de rotas
 * - provideHttpClient: habilita o HttpClient para requisições HTTP
 */
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};
