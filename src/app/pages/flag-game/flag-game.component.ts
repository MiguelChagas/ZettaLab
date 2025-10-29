import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Subject, interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Interface simplificada para os dados necessários do país no jogo
interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  translations: {
    por: {
      common: string;
    };
  };
}

/**
 * Componente de jogo de adivinhação de bandeiras
 * O jogador tem 10 segundos para identificar o país de cada bandeira
 * São 10 rodadas com 5 opções cada
 * Usa RxJS para gerenciar o timer e subscriptions
 */
@Component({
  selector: 'app-flag-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flag-game.component.html',
  styleUrls: ['./flag-game.component.scss'],
})
export class FlagGameComponent implements OnInit, OnDestroy {
  allCountries: Country[] = [];
  currentCountry: Country | null = null;
  options: Country[] = [];
  isLoading = true;
  timeLeft = 10;
  currentRound = 0;
  totalRounds = 10;
  score = 0;
  gameOver = false;
  selectedOption: Country | null = null;
  feedbackVisible = false;
  timerSubscription?: Subscription;
  // Subject: usado para cancelar observables quando componente é destruído
  private destroy$ = new Subject<void>();

  constructor(private countryService: CountryService) {}

  // OnInit: carrega todos os países ao iniciar o componente
  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((data) => {
      this.allCountries = data;
      this.startNewRound();
      this.isLoading = false;
    });
  }

  // OnDestroy: limpa subscriptions para evitar memory leaks
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  // Inicia uma nova rodada do jogo
  startNewRound(): void {
    this.currentRound++;
    if (this.currentRound > this.totalRounds) {
      this.gameOver = true;
      return;
    }

    this.selectedOption = null;
    this.feedbackVisible = false;
    this.timeLeft = 10;
    this.currentCountry = this.getRandomCountry();
    this.options = this.generateOptions();
    this.startTimer();
  }

  // Retorna um país aleatório da lista
  private getRandomCountry(): Country {
    const randomIndex = Math.floor(Math.random() * this.allCountries.length);
    return this.allCountries[randomIndex];
  }

  // Gera 5 opções: o país correto + 4 países aleatórios
  private generateOptions(): Country[] {
    const options: Country[] = [this.currentCountry!];
    while (options.length < 5) {
      const randomCountry = this.getRandomCountry();
      // Evita duplicatas comparando nomes em português
      if (
        !options.some(
          (c) =>
            c.translations.por.common === randomCountry.translations.por.common
        )
      ) {
        options.push(randomCountry);
      }
    }
    return this.shuffleArray(options);
  }

  // Algoritmo Fisher-Yates para embaralhar array
  private shuffleArray(array: Country[]): Country[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Inicia o timer de 10 segundos usando interval do RxJS
  private startTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    // interval: emite valores a cada 1000ms (1 segundo)
    // takeUntil: cancela o observable quando destroy$ emite
    this.timerSubscription = interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.checkAnswer(null); // Tempo esgotado = resposta errada
        }
      });
  }

  // Verifica se a resposta está correta e avança para próxima rodada
  checkAnswer(selectedCountry: Country | null): void {
    if (this.feedbackVisible) return;

    this.selectedOption = selectedCountry;
    this.feedbackVisible = true;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    // Incrementa score se resposta estiver correta
    if (
      selectedCountry &&
      selectedCountry.translations.por.common ===
        this.currentCountry?.translations.por.common
    ) {
      this.score++;
    }

    // Aguarda 2 segundos para mostrar feedback antes de próxima rodada
    setTimeout(() => {
      this.startNewRound();
    }, 2000);
  }

  // Reinicia o jogo do zero
  restartGame(): void {
    this.currentRound = 0;
    this.score = 0;
    this.gameOver = false;
    this.startNewRound();
  }

  // Verifica se um país é a resposta correta
  isCorrectAnswer(country: Country): boolean {
    return (
      country.translations.por.common ===
      this.currentCountry?.translations.por.common
    );
  }
}
