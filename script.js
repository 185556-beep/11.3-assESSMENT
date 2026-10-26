// The questions and answers for the quiz.
const quizData = [ 
  { 
    question: "What is the shortcut button for trim?", 
    options: ["B", "A", "Q", "E"], 
    answer: "B" 
  }, 
  { 
    question: "What is the shortcut button for select?", 
    options: ["B", "A", "Q", "E"], 
    answer: "A" 
  }
];

// Making the variable for the quiz work.
const questionElements = document.querySelector(".question");
const optionsElements = document.querySelectorAll(".option");
const submitsElement = document.querySelector(".submits");

// Maintaining logic.
let currentQuestionIndex = 0;
let score = 0;

// Applying the questions and answers onto the Quiz page.
function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElements.textContent = currentQuestion.question;
  optionsElements.forEach((option, index) => {
    option.textContent = currentQuestion.options[index];
  });
}

// Check if the selected answer is correct.
function checkAnswer(chosenText) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (chosenText === currentQuestion.answer) {
    score++;
  }
}

// Advance to the next question or show final score.
function handleNextQuestion() {
  const selectedOption = document.querySelector("li.option.selected");
  
  if (selectedOption) {
    // Pass the text content of the selected item to check the answer
    checkAnswer(selectedOption.textContent);
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
      resetOptions();
    } else {
      showResults();
    }
  } else {
    alert("Please select an option before submitting!");
  }
}

// Display the final results when the quiz finishes.
function showResults() {
  // Simple layout replacement. Adjust selectors to fit your exact HTML.
  const quizContainer = document.querySelector(".quiz-container") || document.body;
  quizContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your final score is <strong>${score}</strong> out of ${quizData.length}.</p>
  `;
}

// Allow user to switch answers by clearing previous selections.
function resetOptions() {
  optionsElements.forEach((option) => {
    option.classList.remove("selected");
  });
}

// Allow user to click and highlight an answer.
optionsElements.forEach((option) => {
  option.addEventListener("click", () => {
    resetOptions();
    option.classList.add("selected");
  });
});

submitsElement.addEventListener("click", handleNextQuestion);

// Initialize the first question
showQuestion();
