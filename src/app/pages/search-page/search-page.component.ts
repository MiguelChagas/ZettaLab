import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

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
  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private countryService: CountryService) {
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchTerms
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.performSearch(term);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchCountries(searchTerm: string): void {
    this.searchTerms.next(searchTerm);
  }

  private performSearch(searchTerm: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.countries = [];
    this.hasSearched = true;

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
