import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

/**
 * Componente raiz da aplicação
 * Define a estrutura principal com sidebar, conteúdo dinâmico (router-outlet) e footer
 * Usa standalone components (não precisa de módulo NgModule)
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ZettaLab';

  // controla se a sidebar está aberta (apenas relevante em telas pequenas)
  isSidebarOpen = false;

  private routerSub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fecha a sidebar quando a navegação termina (útil em mobile)
    this.routerSub = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.isSidebarOpen = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}
