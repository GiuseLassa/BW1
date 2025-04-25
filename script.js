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
        question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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

// Variabili globali per punteggio e numero della domanda
let score = 0;
let questionNumber = 0;

// Collegamento con gli elementi HTML
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const counter = document.getElementById("counter");

// Avvia il quiz al caricamento della pagina 2 (quando è vero/esiste il div #container2)
if (document.getElementById("container2")) {
    renderQuestion();
}

// Mostra la domanda corrente e le risposte
function renderQuestion() {
    const currentQuestion = questions[questionNumber];

    counter.innerHTML = `Question <span class="current">${questionNumber + 1}</span><span class="total">/${questions.length}</span>`; // Tiene il conto della domanda a fondo pagina

    questionText.innerHTML = currentQuestion.question; // Inserisce la domanda corrente nell'h2
    answersDiv.innerHTML = ""; // Svuota il div #answers dalle eventuali risposte precedenti

    // Logica per distinguere domande vero/falso da multiple (in caso di vero/falso non c'è bisogno di mescolare le risposte)
    const isBoolean = currentQuestion.type === "boolean";
    let shuffledAnswers = [];
    if (!isBoolean) {
        // Prepara le risposte (mischiate)
        const allAnswers = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer); // Concatena in un nuovo array la risposta giusta e quelle sbagliate della domanda corrente
        shuffledAnswers = shuffle(allAnswers); // Mescola le risposte
    }
    const options = isBoolean ? ["True", "False"] : shuffledAnswers;

    // Crea ogni opzione come input radio invisibile + label cliccabile
    options.forEach((answerText) => {
        // Crea la label cliccabile
        const label = document.createElement("label");
        label.classList.add("answerButton"); // classe aggiunta per il CSS

        // Crea i radio e li rende invisibili (meglio che l'utente clicchi sui label)
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer"; // Tutti i radio con lo stesso name fanno parte di un gruppo e garantiscono al suo interno che si possa selezionare una sola risposta
        input.value = answerText;
        input.style.display = "none";

        label.appendChild(input); // Inserisce il radio dentro al label (connettendoli)
        label.append(answerText); // Aggiunge il testo della risposta dopo il radio nell'HTML, visto che il radio è invisibile

        input.addEventListener("click", () => checkAnswer(answerText)); // Quando l’utente clicca sulla risposta, viene chiamata la funzione checkAnswer() passando il testo della risposta selezionata (che verrà confrontato dalla funzione con la risposta esatta)

        answersDiv.appendChild(label); // Una volta che il label è correttamente popolato, lo inserisce nel file HTML
    });
}

// Controlla la risposta e passa alla domanda successiva
function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[questionNumber];

    if (selectedAnswer === currentQuestion.correct_answer) {
        console.log("Answer is correct!");
        score++;
    } else {
        console.log("Answer is incorrect.");
    }

    questionNumber++;

    if (questionNumber < questions.length) {
        renderQuestion();
    } else {
        localStorage.setItem("quizScore", score); // Salva il punteggio per renderlo disponibile anche nella terza pagina
        window.location.href = "results.html";
    }
}

// Funzione per mischiare le domande e le risposte
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

const checkbox = document.getElementById("agree");
const proceedButton = document.getElementById("proceed");

// Disabilita il pulsante inizialmente
if (checkbox && proceedButton) {
    proceedButton.disabled = true;

    proceedButton.disabled = true;

    // Abilita/disabilita il pulsante al click della checkbox
    checkbox.addEventListener("change", function () {
        proceedButton.disabled = !checkbox.checked;
    });

    // Azione quando si clicca su PROCEED
    proceedButton.addEventListener("click", function () {
        if (checkbox.checked) {
            window.location.href = "questions.html";
        }
    });
}

// Funzione per mostrare i risultati sulla terza pagina
if (document.getElementById("container3")) {
    showResults();
}

function showResults() {
    const finalScore = parseInt(localStorage.getItem("quizScore")); // vado a riprendere il punteggio salvato dalla seconda pagina
    const scorePercentage = (finalScore * 100) / questions.length; // lo trasformo in percentuale

    if (scorePercentage >= 60) {
        document.getElementById("passed").innerText = "Passed!";
    } else {
        document.getElementById("passed").innerText = "Not passed :(";
    }

    document.getElementById("percentage").innerText = `${scorePercentage}%`;
    document.getElementById("score").innerText = `${finalScore}/${questions.length} questions`;
}
