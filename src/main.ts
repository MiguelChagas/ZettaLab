/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Ponto de entrada principal da aplicação (client-side)
 * bootstrapApplication: inicializa a aplicação Angular standalone (sem NgModule)
 * Captura e loga erros durante a inicialização
 */
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
