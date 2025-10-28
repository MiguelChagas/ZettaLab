import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Subject, interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  private destroy$ = new Subject<void>();

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((data) => {
      this.allCountries = data;
      this.startNewRound();
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

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

  private getRandomCountry(): Country {
    const randomIndex = Math.floor(Math.random() * this.allCountries.length);
    return this.allCountries[randomIndex];
  }

  private generateOptions(): Country[] {
    const options: Country[] = [this.currentCountry!];
    while (options.length < 5) {
      const randomCountry = this.getRandomCountry();
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

  private shuffleArray(array: Country[]): Country[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private startTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.checkAnswer(null);
        }
      });
  }

  checkAnswer(selectedCountry: Country | null): void {
    if (this.feedbackVisible) return;

    this.selectedOption = selectedCountry;
    this.feedbackVisible = true;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (
      selectedCountry &&
      selectedCountry.translations.por.common ===
        this.currentCountry?.translations.por.common
    ) {
      this.score++;
    }

    setTimeout(() => {
      this.startNewRound();
    }, 2000);
  }

  restartGame(): void {
    this.currentRound = 0;
    this.score = 0;
    this.gameOver = false;
    this.startNewRound();
  }

  isCorrectAnswer(country: Country): boolean {
    return (
      country.translations.por.common ===
      this.currentCountry?.translations.por.common
    );
  }
}
