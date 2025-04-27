const originalQuestions = [
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
];

let questions = [...originalQuestions];
questions = shuffle(questions);

let score = 0;
let questionNumber = 0;

const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const counter = document.getElementById("counter");
const element = document.getElementById("timer");

let timeLeft = 30;
let timer;

// Avvia il quiz solo se siamo sulla pagina corretta
if (document.getElementById("container2")) {
    renderQuestion();
}

// Funzione principale per mostrare la domanda e gestire il timer
function renderQuestion() {
    clearInterval(timer); // Ferma eventuali timer precedenti

    const currentQuestion = questions[questionNumber];
    counter.innerHTML = `Question <span class="current">${questionNumber + 1}</span><span class="total">/${questions.length}</span>`;
    questionText.innerHTML = currentQuestion.question;
    answersDiv.innerHTML = "";

    const isBoolean = currentQuestion.type === "boolean";
    let shuffledAnswers = [];
    if (!isBoolean) {
        const allAnswers = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);
        shuffledAnswers = shuffle(allAnswers);
    }
    const options = isBoolean ? ["True", "False"] : shuffledAnswers;

    options.forEach((answerText) => {
        const label = document.createElement("label");
        label.classList.add("answerButton");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = answerText;
        input.style.display = "none";

        label.appendChild(input);
        label.append(answerText);

        input.addEventListener("click", () => {
            clearInterval(timer); // Ferma il timer alla risposta
            checkAnswer(answerText);
        });

        answersDiv.appendChild(label);
    });

    // Reset timer
    timeLeft = 30;
    element.innerHTML = timeLeft;
    timer = setInterval(countdown, 1000);
}

// Funzione per gestire il conto alla rovescia
function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        checkAnswer(""); // Se scade il tempo, passa risposta vuota
    } else {
        element.innerHTML = timeLeft;
        timeLeft--;
    }
}

// Funzione per controllare la risposta
function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[questionNumber];

    if (selectedAnswer === currentQuestion.correct_answer) {
        score++;
    }

    questionNumber++;

    if (questionNumber < questions.length) {
        renderQuestion();
    } else {
        localStorage.setItem("quizScore", score);
        window.location.href = "results.html";
    }
}

// Mischia l'array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Gestione checkbox pagina 1
const checkbox = document.getElementById("agree");
const proceedButton = document.getElementById("proceed");

if (checkbox && proceedButton) {
    proceedButton.disabled = true;
    checkbox.addEventListener("change", function () {
        proceedButton.disabled = !checkbox.checked;
    });

    proceedButton.addEventListener("click", function () {
        if (checkbox.checked) {
            window.location.href = "questions.html";
        }
    });
}

// Mostra i risultati in container3
if (document.getElementById("container3")) {
    showResults();
}

function showResults() {
    const finalScore = parseInt(localStorage.getItem("quizScore"));
    const scorePercentage = (finalScore * 100) / questions.length;

    if (scorePercentage >= 60) {
        document.getElementById("passed").innerText = "Passed!";
    } else {
        document.getElementById("passed").innerText = "Not passed :(";
    }

    document.getElementById("percentage").innerText = `${scorePercentage}%`;
    document.getElementById("score").innerText = `${finalScore}/${questions.length} questions`;
}
