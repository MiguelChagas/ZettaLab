import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flag-game',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './flag-game.component.html',
  styleUrl: './flag-game.component.scss',
})
export class FlagGameComponent implements OnInit {
  allCountries: any[] = [];
  currentCountry: any = null;
  userGuessControl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  feedbackMessage: string = '';
  isAnswerCorrect: boolean = false;
  isLoading: boolean = true;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((data) => {
      this.allCountries = data;
      this.startNewRound();
      this.isLoading = false;

      // Configuração do autocomplete
      this.filteredOptions = this.userGuessControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCountries
      .map((country) => country.translations.por.common)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }

  startNewRound(): void {
    const randomIndex = Math.floor(Math.random() * this.allCountries.length);
    this.currentCountry = this.allCountries[randomIndex];

    this.userGuessControl.setValue('');
    this.feedbackMessage = '';
    this.isAnswerCorrect = false;
  }

  checkAnswer(): void {
    const userGuess = this.userGuessControl.value;
    if (!userGuess) {
      this.feedbackMessage = 'Por favor, digite um nome.';
      return;
    }

    const correctAnswer =
      this.currentCountry.translations.por.common.toLowerCase();
    const userAnswer = userGuess.toLowerCase().trim();

    if (userAnswer === correctAnswer) {
      this.feedbackMessage = `Correto! O país é ${this.currentCountry.translations.por.common}.`;
      this.isAnswerCorrect = true;
    } else {
      this.feedbackMessage = `Errado! O país correto era ${this.currentCountry.translations.por.common}.`;
      this.isAnswerCorrect = false;
    }
  }
}
