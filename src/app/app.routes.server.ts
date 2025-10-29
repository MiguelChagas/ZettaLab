import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Configuração de rotas para SSR (Server-Side Rendering)
 * Define que todas as rotas ('**') devem ser pré-renderizadas no servidor
 * RenderMode.Prerender: gera HTML estático durante o build para melhor performance
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
