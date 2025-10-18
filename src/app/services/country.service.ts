import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any[]> {
    const fields = 'name,flags,population,capital';

    return this.http.get<any[]>(`${this.apiUrl}/all?fields=${fields}`);
  }
}
