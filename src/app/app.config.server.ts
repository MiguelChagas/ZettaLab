import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

/**
 * Configuração do servidor para SSR (Server-Side Rendering)
 * Mescla a configuração do cliente com providers específicos do servidor
 * - provideServerRendering: habilita renderização no servidor
 * - provideServerRouting: configura rotas para pré-renderização
 */
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideServerRouting(serverRoutes)],
};

// mergeApplicationConfig: combina configurações do cliente e servidor
export const config = mergeApplicationConfig(appConfig, serverConfig);
