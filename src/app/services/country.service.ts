import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  private fields =
    'name,flags,population,capital,translations,currencies,region,subregion,languages';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all?fields=${this.fields}`);
  }

  getCountryByTranslation(searchTerm: string): Observable<any[]> {
    return this.getAllCountries().pipe(
      map((countries) => {
        const searchTermLower = searchTerm.toLowerCase().trim();
        return countries.filter((country) => {
          const countryName = country.translations.por.common.toLowerCase();
          return countryName.startsWith(searchTermLower);
        });
      })
    );
  }
}
