import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Componente de menu lateral (sidebar) da aplicação
 * Fornece navegação entre as diferentes páginas usando Angular Router
 * - RouterLink: permite navegação declarativa entre rotas
 * - RouterLinkActive: adiciona classe 'active' automaticamente na rota atual
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
