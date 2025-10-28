import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  private fields = 'name,flags,population,capital,translations';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all?fields=${this.fields}`);
  }

  getCountryByTranslation(portugueseName: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/translation/${portugueseName}?fields=${this.fields}`
    );
  }
}
