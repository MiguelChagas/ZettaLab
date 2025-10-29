import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

// Interface para estrutura de moedas
interface Currency {
  name: string;
  symbol: string;
}

// Interface para estrutura completa de dados de um país da API REST Countries
interface Country {
  name: {
    official: string;
  };
  translations: {
    por: {
      common: string;
    };
  };
  flags: {
    svg: string;
    alt: string;
  };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  languages: { [key: string]: string };
  currencies: { [key: string]: Currency };
  car: {
    side: string;
  };
  area: number;
  timezones: string[];
  borders?: string[];
  maps: {
    googleMaps: string;
  };
}

/**
 * Componente de detalhamento de país
 * Exibe informações detalhadas de um país específico obtido da API REST Countries
 * O nome do país é capturado da rota através do ActivatedRoute
 */
@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
})
export class CountryDetailComponent implements OnInit {
  country: Country | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  countryName: string = '';

  constructor(
    private route: ActivatedRoute, // Serviço do Angular para acessar parâmetros da rota
    private countryService: CountryService
  ) {}

  // OnInit: hook do ciclo de vida do Angular executado após a criação do componente
  ngOnInit(): void {
    // Subscribe: método do RxJS para observar mudanças nos parâmetros da rota
    this.route.params.subscribe((params) => {
      this.countryName = params['nome'];
      this.loadCountryData();
    });
  }

  // Busca os dados do país na API através do CountryService
  loadCountryData(): void {
    this.isLoading = true;
    // Subscribe: observa a resposta da requisição HTTP
    this.countryService.getCountryByTranslation(this.countryName).subscribe({
      next: (data) => {
        this.country = data[0]; // API retorna array, pega o primeiro resultado
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Não foi possível carregar os dados do país.';
        this.isLoading = false;
      },
    });
  }

  // Retorna string com todas as línguas do país separadas por vírgula
  getLanguages(): string {
    if (!this.country?.languages) return 'N/A';
    // Object.values: método JavaScript que retorna array com os valores de um objeto
    return Object.values(this.country.languages).join(', ');
  }

  // Retorna string com todas as moedas formatadas (nome e símbolo)
  getCurrencies(): string {
    if (!this.country?.currencies) return 'N/A';
    return Object.values(this.country.currencies)
      .map((curr) => `${curr.name} (${curr.symbol})`)
      .join(', ');
  }

  // Retorna região e sub-região do país
  getRegion(): string {
    if (!this.country) return 'N/A';
    return this.country.subregion
      ? `${this.country.region} (${this.country.subregion})`
      : this.country.region;
  }
}
