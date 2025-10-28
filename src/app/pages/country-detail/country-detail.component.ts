import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

interface Currency {
  name: string;
  symbol: string;
}

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
    private route: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.countryName = params['nome'];
      this.loadCountryData();
    });
  }

  loadCountryData(): void {
    this.isLoading = true;
    this.countryService.getCountryByTranslation(this.countryName).subscribe({
      next: (data) => {
        this.country = data[0];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Não foi possível carregar os dados do país.';
        this.isLoading = false;
      },
    });
  }

  getLanguages(): string {
    if (!this.country?.languages) return 'N/A';
    return Object.values(this.country.languages).join(', ');
  }

  getCurrencies(): string {
    if (!this.country?.currencies) return 'N/A';
    return Object.values(this.country.currencies)
      .map((curr) => `${curr.name} (${curr.symbol})`)
      .join(', ');
  }

  getRegion(): string {
    if (!this.country) return 'N/A';
    return this.country.subregion
      ? `${this.country.region} (${this.country.subregion})`
      : this.country.region;
  }
}
