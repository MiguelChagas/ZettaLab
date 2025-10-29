import { Routes } from '@angular/router';
import { CountryListComponent } from './pages/country-list/country-list.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FlagGameComponent } from './pages/flag-game/flag-game.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';

/**
 * Definição de rotas da aplicação
 * Mapeia URLs para seus respectivos componentes
 */
export const routes: Routes = [
  {
    // Rota raiz redireciona para /paises
    path: '',
    redirectTo: '/paises',
    pathMatch: 'full', // Só redireciona se a URL for exatamente '/'
  },
  {
    // Página principal com lista de todos os países
    path: 'paises',
    component: CountryListComponent,
  },
  {
    // Página de pesquisa de países
    path: 'pesquisar',
    component: SearchPageComponent,
  },
  {
    // Página do jogo de adivinhação de bandeiras
    path: 'jogo-bandeiras',
    component: FlagGameComponent,
  },
  {
    // Página de detalhes de um país específico
    // :nome é um parâmetro dinâmico capturado pela rota
    path: 'pais/:nome',
    component: CountryDetailComponent,
  },
];
