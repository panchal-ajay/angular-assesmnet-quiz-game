import { Injectable } from "@angular/core";

interface Question {
  question: string;
  options: string[];
  answer: string;
  hint?: string;
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
      hint: "It's a single-digit number and the sum of 2 and 7.",
    },
    {
      question: "Q2 : What is 5x15?",
      options: ["25", "50", "75", "100"],
      answer: "75",
      hint: "Think about multiplying 5 by a number in the middle of the teens.",
    },
    {
      question: "Q3 : What is 6x9?",
      options: ["54", "36", "24", "69"],
      answer: "54",
      hint: "It's the same as 6 times 9.",
    },
    {
      question: "Q4 : What is 0+0?",
      options: ["0", "1", "100", "1000"],
      answer: "0",
      hint: "Adding zero to zero gives you what?",
    },
    {
      question: "Q5 : How many alphabets are there in the word “apple”?",
      options: ["10", "15", "5", "8"],
      answer: "5",
      hint: "Count the number of letters in the word 'apple.'",
    },
    {
      question: "Q6 : What is the colour of moon?",
      options: ["red", "orange", "pink", "white"],
      answer: "white",
      hint: "It's the color often associated with cleanliness and simplicity.",
    },
    {
      question: "Q7 : How many legs does a chicken have?",
      options: ["66", "2", "4", "10"],
      answer: "2",
      hint: "Think about the number of legs most birds have.",
    },
    {
      question: "Q8 : Which one of these is not a programming language?",
      options: ["C", "C++", "Javascript", "English"],
      answer: "English",
      hint: "It's the only option that isn't related to coding.",
    },
    {
      question: "Q9 : How many days are there in a week?",
      options: ["Ten", "Five", "Seven", "Six"],
      answer: "Seven",
      hint: "It's the total number of days from Monday to Sunday.",
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
    this.setUserPrize();
  }
  setUserPrize() {
    this.currentPrize;
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
    } else if (lifeline === "askTheAI" && !this.lifelinesUsed[lifeline]) {
      this.lifelinesUsed[lifeline] = true;
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

  getHint(): string {
    return this.questions[this.currentQuestionIndex].hint || "";
  }
}
