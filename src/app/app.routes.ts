import { Routes } from '@angular/router';
import { CountryListComponent } from './pages/country-list/country-list.component';

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
];
