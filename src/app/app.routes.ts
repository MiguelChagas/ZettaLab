import { Routes } from '@angular/router';
import { CountryListComponent } from './pages/country-list/country-list.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

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
    path: 'paises',
    component: SearchPageComponent,
  },
];
