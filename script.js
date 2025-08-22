const quizData = [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Hyper Transfer Mark Language", "Home Tool Markup Language"], answer: 0 },
  { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Styled Sections", "Colorful Style Sheet"], answer: 0 },
  { question: "Which language runs in a web browser?", options: ["Java", "C", "Python", "JavaScript"], answer: 3 },
  { question: "What year was JavaScript launched?", options: ["1996", "1995", "1994", "None of the above"], answer: 1 },
  { question: "Which company developed JavaScript?", options: ["Microsoft", "Netscape", "Sun Microsystems", "Google"], answer: 1 },
  { question: "Which property is used to change text color in CSS?", options: ["color", "background-color", "font-color", "text-style"], answer: 0 },
  { question: "Inside which HTML element do we put JavaScript?", options: ["<script>", "<js>", "<javascript>", "<code>"], answer: 0 },
  { question: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World')", "alert('Hello World')", "msgBox('Hello World')", "alertBox('Hello World')"], answer: 1 },
  { question: "Which HTML attribute specifies an alternate text for an image?", options: ["title", "alt", "src", "longdesc"], answer: 1 },
  { question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], answer: 2 }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timeEl = document.getElementById("time");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timeEl.textContent = timeLeft;

  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = "";

  currentQuiz.options.forEach((opt, index) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => selectOption(li, index));
    optionsEl.appendChild(li);
  });

  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function selectOption(li, index) {
  const allOptions = optionsEl.querySelectorAll("li");
  allOptions.forEach(opt => opt.classList.remove("selected"));
  li.classList.add("selected");
  li.dataset.selected = index;
}

function nextQuestion() {
  const selected = optionsEl.querySelector(".selected");
  if (selected) {
    const answer = parseInt(selected.dataset.selected);
    if (answer === quizData[currentQuestion].answer) {
      score++;
    }
  }
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    quizEl.style.animation = "fadeIn 0.6s ease";
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

nextBtn.addEventListener("click", nextQuestion);

loadQuestion();
