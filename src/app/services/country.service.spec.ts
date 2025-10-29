import { TestBed } from '@angular/core/testing';
import { CountryService } from './country.service';

// Arquivo de testes unitários do CountryService
// Verifica se o serviço é criado corretamente
describe('CountryService', () => {
  let service: CountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // TestBed.inject: método do Angular para injetar serviços nos testes
    service = TestBed.inject(CountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
