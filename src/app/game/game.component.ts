import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatToolbarModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  question: any;
  userAnswer: string = '';
  lifelines = {
    fiftyFifty: false,
    askTheAI: false,
  };
  prize: number = 0;
  userName: string | null = '';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.userName = this.gameService.getUserName();
    this.loadQuestion();
  }

  loadQuestion() {
    this.question = this.gameService.getQuestion();
    this.prize = this.gameService.getCurrentPrize();
  }

  submitAnswer() {
    if (this.gameService.checkAnswer(this.userAnswer)) {
      this.gameService.currentPrize =
        this.gameService.prizeLevels[this.gameService.currentQuestionIndex];
      this.gameService.nextQuestion();
      this.loadQuestion();
    } else {
      alert('Incorrect answer! Game over.');
    }
  }

  useLifeline(lifeline: 'fiftyFifty' | 'askTheAI') {
    this.gameService.useLifeline(lifeline);
    this.lifelines[lifeline] = true;
  }

  quitGame() {
    alert(`You won Rs ${this.gameService.getCurrentPrize()}`);
  }
}
