import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Para a rota dinâmica de detalhes do país
    path: 'pais/:nome',
    // Usamos RenderMode.Client para que o navegador busque os dados na hora.
    // Isso evita o erro de build pois o Angular para de tentar "adivinhar" os países.
    renderMode: RenderMode.Client,
  },
  {
    // Para todas as outras rotas (Home, Lista, Jogo, etc.)
    path: '**',
    // Mantemos o Prerender (Geração Estática) para máxima velocidade
    renderMode: RenderMode.Prerender,
  },
];
