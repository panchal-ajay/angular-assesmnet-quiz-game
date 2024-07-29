import { Injectable } from '@angular/core';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private questions: Question[] = [
    { question: 'What is 2+7?', options: ['3', '7', '9', '11'], answer: '9' },
    {
      question: 'What is 5x15?',
      options: ['25', '50', '75', '100'],
      answer: '75',
    },
    {
      question: 'What is 6x9?',
      options: ['54', '36', '24', '69'],
      answer: '54',
    },
    {
      question: 'What is 0+0?',
      options: ['0', '1', '100', '1000'],
      answer: '0',
    },
    {
      question: 'How many alphabets are there in the word “apple”?',
      options: ['10', '15', '5', '7'],
      answer: '5',
    },
    {
      question: 'What is the colour of moon?',
      options: ['red', 'orange', 'pink', 'white'],
      answer: 'white',
    },
    {
      question: 'How many legs does a chicken have?',
      options: ['1', '2', '4', '10'],
      answer: '2',
    },
    {
      question: 'Which one of these is not a programming language?',
      options: ['C', 'C++', 'Javascript', 'English'],
      answer: 'English',
    },
    {
      question: 'How many days are there in a week?',
      options: ['10', '5', '7', '6'],
      answer: '7',
    },
  ];

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

  getCurrentPrize(): number {
    return this.currentPrize;
  }
  getCurrentLevel(): number {
    return this.currentQuestionIndex + 1;
  }
  setUserLevel(level: number) {
    localStorage.setItem('userLevel', level.toString());
  }
  IsLoggedIn() {
    return localStorage.getItem('accessToken') != null;
  }
  getUserName() {
    return localStorage.getItem('displayName');
  }

  useLifeline(lifeline: 'fiftyFifty' | 'askTheAI') {
    if (!this.lifelinesUsed[lifeline]) {
      this.lifelinesUsed[lifeline] = true;
    }
  }
}
