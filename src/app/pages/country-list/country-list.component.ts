import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
})
export class CountryListComponent implements OnInit {
  countries: any[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    console.log('Iniciando a busca por países...');
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        console.log('Dados recebidos com sucesso!', data);
        const sortedData = data.sort((a, b) =>
          a.translations.por.common.localeCompare(b.translations.por.common)
        );
        this.countries = sortedData;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Ocorreu um erro ao buscar os países:', err);
        this.errorMessage =
          'Não foi possível carregar a lista de países. Tente novamente mais tarde.';
        this.isLoading = false;
      },
    });
  }
}
