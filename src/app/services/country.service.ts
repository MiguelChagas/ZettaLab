import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Serviço responsável por consumir a API REST Countries
 * Fornece métodos para buscar todos os países e pesquisar por tradução
 * @Injectable com providedIn: 'root' torna o serviço singleton em toda aplicação
 */
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  // URL base da API REST Countries v3.1
  private apiUrl = 'https://restcountries.com/v3.1';

  // Campos específicos para otimizar a resposta da API (reduz tamanho do payload)
  private fields =
    'name,flags,population,capital,translations,region,languages';

  // HttpClient: serviço do Angular para fazer requisições HTTP
  constructor(private http: HttpClient) {}

  /**
   * Busca todos os países da API
   * @returns Observable com array de países contendo apenas os campos especificados
   */
  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all?fields=${this.fields}`);
  }

  /**
   * Busca países por tradução em português
   * Filtra localmente os resultados já carregados para evitar múltiplas requisições
   * @param searchTerm - termo de busca em português
   * @returns Observable com array de países filtrados
   */
  getCountryByTranslation(searchTerm: string): Observable<any[]> {
    return this.getAllCountries().pipe(
      // map: operador RxJS que transforma os dados do Observable
      map((countries) => {
        const searchTermLower = searchTerm.toLowerCase().trim();
        // Filtra países cujo nome em português começa com o termo buscado
        return countries.filter((country) => {
          const countryName = country.translations.por.common.toLowerCase();
          // startsWith: busca apenas países que começam com o termo (não busca parcial no meio)
          return countryName.startsWith(searchTermLower);
        });
      })
    );
  }
}
