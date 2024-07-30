import { Injectable } from "@angular/core";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

@Injectable({
  providedIn: "root",
})
export class GameService {
  private questions: Question[] = [
    {
      question: "Q1 : What is 2+7?",
      options: ["3", "7", "9", "11"],
      answer: "9",
    },
    {
      question: "Q2 : What is 5x15?",
      options: ["25", "50", "75", "100"],
      answer: "75",
    },
    {
      question: "Q3 : What is 6x9?",
      options: ["54", "36", "24", "69"],
      answer: "54",
    },
    {
      question: "Q4 : What is 0+0?",
      options: ["0", "1", "100", "1000"],
      answer: "0",
    },
    {
      question: "Q5 : How many alphabets are there in the word “apple”?",
      options: ["10", "15", "5", "8"],
      answer: "5",
    },
    {
      question: "Q6 : What is the colour of moon?",
      options: ["red", "orange", "pink", "white"],
      answer: "white",
    },
    {
      question: "Q7 : How many legs does a chicken have?",
      options: ["1", "2", "4", "10"],
      answer: "2",
    },
    {
      question: "Q8 : Which one of these is not a programming language?",
      options: ["C", "C++", "Javascript", "English"],
      answer: "English",
    },
    {
      question: "Q9 : How many days are there in a week?",
      options: ["Ten", "Five", "Seven", "Six"],
      answer: "Seven",
    },
  ];
  private disabledOptions: string[] = [];

  currentQuestionIndex = 0;
  lifelinesUsed = {
    fiftyFifty: false,
    askTheAI: false,
  };
  prizeLevels = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000];
  currentPrize = 0;
  milestones = [1000, 1000000];

  getQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  checkAnswer(answer: string): boolean {
    return answer === this.getQuestion().answer;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
  }
  setCurrentQuesInd() {
    this.currentQuestionIndex = 0;
  }
  getCurrentPrize(): number {
    return this.currentPrize;
  }
  getCurrentLevel(): any {
    return localStorage.getItem("userLevel");
  }
  getCurrentQuestionIndex(): number {
    console.log("this.currentQuestionIndex: ", this.currentQuestionIndex);
    return this.currentQuestionIndex;
  }
  setUserLevel(level: string) {
    localStorage.setItem("userLevel", level);
  }
  IsLoggedIn() {
    return localStorage.getItem("accessToken") != null;
  }
  getUserName() {
    return localStorage.getItem("displayName");
  }
  getTotalQuestions(): any {
    return localStorage.getItem("totalQuestions");
  }
  useLifeline(lifeline: "fiftyFifty" | "askTheAI") {
    if (lifeline === "fiftyFifty" && !this.lifelinesUsed[lifeline]) {
      this.lifelinesUsed[lifeline] = true;
      this.applyFiftyFifty();
    } else if (lifeline === "askTheAI") {
      // Your askTheAI logic here
    }
  }
  private applyFiftyFifty() {
    const question = this.getQuestion();
    const correctAnswer = question.answer;
    const incorrectOptions = question.options.filter(
      (option) => option !== correctAnswer
    );

    const optionsToDisable = incorrectOptions
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    this.disabledOptions = optionsToDisable;
  }

  getDisabledOptions(): string[] {
    return this.disabledOptions;
  }
}
