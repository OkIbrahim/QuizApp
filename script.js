"use strict";

const questions = [
  {
    question: "What is the capital city of Australia?",
    choices: [
      { text: "Canberra", correct: true },
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Brisbane", correct: false },
    ],
  },

  {
    question: "Which planet is known as the Red Planet?",
    choices: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false },
    ],
  },

  {
    question: "What is the largest ocean on Earth?",
    choices: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },

  {
    question: "What date was Google founded?",
    choices: [
      { text: "August 4, 1997", correct: false },
      { text: "September 4, 1998", correct: true },
      { text: "October 4, 1999", correct: false },
      { text: "November 4, 2000", correct: false },
    ],
  },

  {
    question: "Which is the tallest building in the world?",
    choices: [
      { text: "Burj Khalifa", correct: true },
      { text: "Merdeka 118", correct: false },
      { text: "Shanghai Tower", correct: false },
      { text: "Makkah Clock Royal Tower", correct: false },
    ],
  },

  {
    question: "In what year did the Berlin Wall fall?",
    choices: [
      { text: "1985", correct: false },
      { text: "1991", correct: false },
      { text: "1989", correct: true },
      { text: "1994", correct: false },
    ],
  },

  {
    question: "The fear of insects is known as what?",
    choices: [
      { text: "Entomophobia", correct: true },
      { text: "Arachnophobia", correct: false },
      { text: "Ailurophobia", correct: false },
      { text: "Cynophobia", correct: false },
    ],
  },

  {
    question: "Who painted the Mona Lisa?",
    choices: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Michelangelo", correct: false },
    ],
  },

  {
    question: "Which country drinks the most coffee per capita?",
    choices: [
      { text: "Italy", correct: false },
      { text: "United States", correct: false },
      { text: "Finland", correct: true },
      { text: "Brazil", correct: false },
    ],
  },

  {
    question: "What is the only mammal that cannot jump?",
    choices: [
      { text: "Rhinoceros", correct: false },
      { text: "Elephant", correct: true },
      { text: "Whale", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
];

// Selecting Elements
const questionContainer = document.querySelector(".question-container");
const progressDisplay = document.querySelector(".progress");
const resultsArea = document.querySelector(".results-area");
const scoreDisplay = document.querySelector(".score-display");
const resultDisplay = document.querySelector(".result-display");
const questionDisplay = document.querySelector(".question-display");
const questionElement = document.querySelector(".question-text");
const choicesContainer = document.querySelector(".answer-options");
const restartButton = document.querySelector(".restart-quiz");
const submitButton = document.querySelector(".submit");

let userAnswers = new Array(questions.length).fill(null);

// Event delegation on the parent container of the options
choicesContainer.addEventListener("click", function (e) {
  // Ensure a button was clicked
  if (!e.target.classList.contains("option")) return;

  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  selectAnswer(isCorrect, selectedButton);
});

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  progressDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesContainer.innerHTML = ""; // Clear previous choices

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.classList.add("option");
    // Add a data attribute to store whether it's correct or not
    button.dataset.correct = choice.correct;
    choicesContainer.appendChild(button);
  });
}

function selectAnswer(isCorrect, button) {
  const allOptions = document.querySelectorAll(".option");

  // Save user's answer
  userAnswers[currentQuestionIndex] = {
    selected: button.textContent,
    correct: isCorrect,
  };

  // Disable all buttons after one click
  allOptions.forEach((btn) => (btn.disabled = true));

  if (isCorrect) {
    score++;
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }

  scoreDisplay.textContent = score;

  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      submitQuiz();
    }
  }, 1000);

  if (!isCorrect) {
    allOptions.forEach((btn) => {
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
      }
    });
  }
}

// Button handlers
submitButton.addEventListener("click", submitQuiz);

restartButton.addEventListener("click", restartQuiz);

function submitQuiz() {
  // Loop through userAnswers and compare with the questions array
  // Calculate final score
  // Display final score in the final score area and hide the quiz interface
  console.log("Quiz Submitted!");
  scoreDisplay.textContent = score;

  resultDisplay.textContent = `${score}/10`;
  submitButton.style.display = "none";
  resultsArea.style.display = "block";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  scoreDisplay.textContent = score;
  resultDisplay.textContent = "";

  questionContainer.style.display = "block";
  submitButton.style.display = "block";
  resultsArea.style.display = "none";
  loadQuestion();
  // Logic to show the quiz interface and hide the final score area
}

// On script load
loadQuestion();
