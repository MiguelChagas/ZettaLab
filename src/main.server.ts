import {
  BootstrapContext,
  bootstrapApplication,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Ponto de entrada para SSR (Server-Side Rendering)
 * Inicializa a aplicação Angular no servidor usando a configuração de servidor
 * BootstrapContext: contexto fornecido pelo Angular SSR para inicialização
 */
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, config, context);

export default bootstrap;
