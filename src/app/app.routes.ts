import { Routes } from '@angular/router';
import { CountryListComponent } from './pages/country-list/country-list.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FlagGameComponent } from './pages/flag-game/flag-game.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/paises',
    pathMatch: 'full',
  },
  {
    path: 'paises',
    component: CountryListComponent,
  },
  {
    path: 'pesquisar',
    component: SearchPageComponent,
  },
  {
    path: 'jogo-bandeiras',
    component: FlagGameComponent,
  },
];
