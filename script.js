const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const questionContainer = document.querySelector(".question-container");
const difficultySelector = document.querySelector(".difficulty-selector");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;
let selectedDifficulty = "";
let questions = [];

const quizQuestions = {
    beginner: [
        {
            question: "What does HTML stand for?",
            answers: [
                { text: "Hyper Text Markup Language", correct: true },
                { text: "Hyperlinks and Text Markup Language", correct: false },
                { text: "Home Tool Markup Language", correct: false }
            ]
        },
        {
            question: "Which CSS property controls text size?",
            answers: [
                { text: "font-style", correct: false },
                { text: "font-size", correct: true },
                { text: "text-size", correct: false }
            ]
        },
        {
            question: "How do you declare a JavaScript variable?",
            answers: [
                { text: "var x = 5;", correct: true },
                { text: "variable x = 5;", correct: false },
                { text: "x := 5;", correct: false }
            ]
        },
        {
            question: "Which HTML tag is used for creating a hyperlink?",
            answers: [
                { text: "<link>", correct: false },
                { text: "<a>", correct: true },
                { text: "<href>", correct: false }
            ]
        }
    ],
    intermediate: [
        {
            question: "What is the purpose of `useEffect` in React?",
            answers: [
                { text: "To manage component state", correct: false },
                { text: "To perform side effects in functional components", correct: true },
                { text: "To create reusable UI components", correct: false }
            ]
        },
        {
            question: "What does `flex: 1` do in CSS Flexbox?",
            answers: [
                { text: "Makes the item grow to fill available space", correct: true },
                { text: "Sets a fixed width of 1px", correct: false },
                { text: "Aligns items vertically", correct: false }
            ]
        },
        {
            question: "What is event delegation in JavaScript?",
            answers: [
                { text: "Attaching events to parent elements instead of children", correct: true },
                { text: "Creating custom events", correct: false },
                { text: "Removing event listeners", correct: false }
            ]
        },
        {
            question: "What does the 'C' stand for in CSS?",
            answers: [
                { text: "Computer", correct: false },
                { text: "Cascading", correct: true },
                { text: "Creative", correct: false }
            ]
        }
    ],
    advanced: [
        {
            question: "What is the Virtual DOM in React?",
            answers: [
                { text: "A lightweight copy of the real DOM", correct: true },
                { text: "A browser API for DOM manipulation", correct: false },
                { text: "A state management library", correct: false }
            ]
        },
        {
            question: "How does `React.memo()` optimize performance?",
            answers: [
                { text: "By memoizing component renders", correct: true },
                { text: "By reducing bundle size", correct: false },
                { text: "By caching API responses", correct: false }
            ]
        },
        {
            question: "What is the purpose of the `Intersection Observer API`?",
            answers: [
                { text: "To track visibility of elements in the viewport", correct: true },
                { text: "To observe CSS animations", correct: false },
                { text: "To detect browser resizing", correct: false }
            ]
        },
        {
            question: "What does 'SSR' stand for in Next.js?",
            answers: [
                { text: "Server-Side Rendering", correct: true },
                { text: "Static Site Rendering", correct: false },
                { text: "Single Source Routing", correct: false }
            ]
        }
    ]
};

// Set difficulty level and start quiz
difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedDifficulty = button.dataset.level;
        questions = quizQuestions[selectedDifficulty];
        difficultySelector.classList.add("hide");
        questionContainer.classList.remove("hide");
        startQuiz();
    });
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.classList.remove("hide");
}

function showScore() {
    resetState();
    questionElement.textContent = `Quiz Completed!`;
    scoreElement.textContent = `Your score: ${score}/${questions.length}`;
    scoreElement.classList.remove("hide");
    nextButton.textContent = "Restart Quiz";
    nextButton.classList.remove("hide");
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        questionContainer.classList.add("hide");
        difficultySelector.classList.remove("hide");
        scoreElement.classList.add("hide");
        progressBar.style.width = "0%";
    }
});