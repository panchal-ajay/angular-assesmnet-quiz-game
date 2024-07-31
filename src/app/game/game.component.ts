import { Component, OnDestroy, OnInit } from "@angular/core";
import { GameService } from "../service/game.service";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Router } from "@angular/router";

@Component({
  selector: "app-game",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatToolbarModule],
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit, OnDestroy {
  question: any;
  userAnswer: string = "";
  lifelines = {
    fiftyFifty: false,
    askTheAI: false,
  };
  hint: string = "";
  prize: number = 0;
  userName: any = "";
  userLevel: any = 1;
  userId: number | null = null;
  gameStarted: boolean = false;
  users: any[] = [];
  totalQuestions: number = 0;
  currentQuestionIndex: number = 0;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserDetails();
    if (this.gameStarted) {
      this.totalQuestions = this.gameService.getTotalQuestions();
      this.loadQuestion();
    } else {
      alert("Game already played or user not found. You cannot play again.");
      this.router.navigate(["/leader-board"]);
    }
  }

  loadUserDetails() {
    const storedUsers = localStorage.getItem("users");
    this.userId = Number(localStorage.getItem("userId"));

    if (storedUsers && this.userId) {
      this.users = JSON.parse(storedUsers);
      const currentUser = this.users.find(
        (user) => user.userId === this.userId
      );
      if (currentUser) {
        this.userName = currentUser.userName;
        this.userLevel = currentUser.userLevel;
        this.prize = currentUser.prizePool;
        this.gameStarted = currentUser.gameStarted;
      } else {
        this.initializeNewUser();
      }
    } else {
      this.initializeNewUser();
    }
  }

  initializeNewUser() {
    this.userId = Number(localStorage.getItem("userId"));
    this.userName = this.gameService.getUserName();
    this.userLevel = this.gameService.getCurrentLevel();
    this.prize = this.gameService.getCurrentPrize();
    this.gameStarted = true;
    this.saveUserDetails();
  }

  saveUserDetails() {
    const currentUser = {
      userId: this.userId,
      userName: this.userName,
      userLevel: this.userLevel,
      prizePool: this.gameService.getCurrentPrize(),
      gameStarted: this.gameStarted,
    };

    const existingUserIndex = this.users.findIndex(
      (user) => user.userId === this.userId
    );
    if (existingUserIndex > -1) {
      this.users[existingUserIndex] = currentUser;
    } else {
      this.users.push(currentUser);
    }

    localStorage.setItem("users", JSON.stringify(this.users));
  }

  loadQuestion() {
    this.question = this.gameService.getQuestion();
    this.prize = this.gameService.getCurrentPrize();
    this.currentQuestionIndex = this.gameService.getCurrentQuestionIndex();
    this.hint = ""; // Hide the hint when loading a new question
  }

  submitAnswer() {
    if (this.gameService.checkAnswer(this.userAnswer)) {
      this.gameService.currentPrize =
        this.gameService.prizeLevels[this.gameService.currentQuestionIndex];
      this.userLevel++;
      this.gameService.setUserLevel(this.userLevel);
      this.gameService.nextQuestion();
      this.saveUserDetails();
      this.allCorrectAns();
    } else {
      alert("Incorrect answer! Game over.");
      this.gameStarted = false;
      this.saveUserDetails();
      this.router.navigate(["/leader-board"]);
    }
  }

  allCorrectAns() {
    this.currentQuestionIndex = this.gameService.getCurrentQuestionIndex();
    if (this.currentQuestionIndex >= this.totalQuestions) {
      alert(
        `Congratulations ${this.userName}! You have answered all questions correctly.`
      );
      this.gameStarted = false;
      this.saveUserDetails()
      this.router.navigate(["/leader-board"]);
    } else {
      this.loadQuestion();
    }
  }

  useLifeline(lifeline: "fiftyFifty" | "askTheAI") {
    this.gameService.useLifeline(lifeline);
    this.lifelines[lifeline] = true;
    if (lifeline === "askTheAI") {
      this.hint = this.gameService.getHint();
    }
  }

  quitGame() {
    alert(`You won Rs ${this.gameService.getCurrentPrize()}`);
    this.gameStarted = false;
    this.saveUserDetails();
    this.router.navigate(["/leader-board"]);
  }

  isOptionDisabled(option: string) {
    if (this.lifelines.fiftyFifty) {
      const disabledOptions = this.gameService.getDisabledOptions();
      return disabledOptions.includes(option);
    }
    return false;
  }

  selectOption(option: string) {
    this.userAnswer = option;
  }

  ngOnDestroy(): void {
    this.gameService.setCurrentQuesInd();
  }
}
