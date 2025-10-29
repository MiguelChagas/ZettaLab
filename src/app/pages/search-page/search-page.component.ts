import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

/**
 * Componente de página de pesquisa de países
 * Implementa busca com debounce (atraso) para evitar requisições excessivas
 * Usa operadores RxJS para otimizar a busca em tempo real
 */
@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnDestroy {
  countries: any[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  hasSearched: boolean = false;
  // Subject: stream de termos de busca digitados pelo usuário
  private searchTerms = new Subject<string>();
  // Subject para cancelar subscriptions ao destruir componente
  private destroy$ = new Subject<void>();

  constructor(private countryService: CountryService) {
    this.setupSearch();
  }

  /**
   * Configura o pipeline de busca com operadores RxJS:
   * - debounceTime(300): aguarda 300ms após parar de digitar antes de buscar
   * - distinctUntilChanged(): só busca se o termo for diferente do anterior
   * - takeUntil(): cancela subscription quando componente é destruído
   */
  private setupSearch(): void {
    this.searchTerms
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.performSearch(term);
      });
  }

  // OnDestroy: limpa subscriptions para evitar memory leaks
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Emite novo termo de busca para o Subject
  searchCountries(searchTerm: string): void {
    this.searchTerms.next(searchTerm);
  }

  // Executa a busca na API REST Countries
  private performSearch(searchTerm: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.countries = [];
    this.hasSearched = true;

    // Se campo estiver vazio, não faz requisição
    if (!searchTerm) {
      this.isLoading = false;
      return;
    }

    this.countryService.getCountryByTranslation(searchTerm).subscribe({
      next: (data) => {
        this.countries = data;
        this.isLoading = false;
      },
      error: (err) => {
        // Tratamento específico para erro 404 (país não encontrado)
        if (err.status === 404) {
          this.errorMessage = `Nenhum país encontrado com o nome "${searchTerm}".`;
        } else {
          this.errorMessage = 'Ocorreu um erro na busca.';
        }
        this.isLoading = false;
      },
    });
  }
}
