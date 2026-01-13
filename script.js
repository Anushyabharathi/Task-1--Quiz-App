const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: 1
    },
    {
        question: "Which is not a JavaScript framework?",
        options: ["React", "Angular", "Vue", "Django"],
        answer: 3
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const correctAnswerEl = document.getElementById("correct-answer");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    correctAnswerEl.textContent = "";
    nextBtn.style.display = "none";

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(btn, index);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(button, selectedIndex) {
    const correctIndex = questions[currentQuestion].answer;
    const buttons = document.querySelectorAll("#options button");

    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        button.classList.add("correct");
        feedbackEl.textContent = "✅ Correct!";
        feedbackEl.style.color = "green";
        score++;
    } else {
        button.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
        feedbackEl.textContent = "❌ Wrong!";
        feedbackEl.style.color = "red";
    }

    correctAnswerEl.textContent =
        "Correct Answer: " + questions[currentQuestion].options[correctIndex];

    scoreEl.textContent = "Score: " + score;
    nextBtn.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-area").innerHTML = `
        <h2>🎉 Quiz Completed!</h2>
        <p>Your Score: <strong>${score}/${questions.length}</strong></p>
        <p>${score >= 2 ? "Excellent work! 💪" : "Keep practicing! 😊"}</p>
    `;
    nextBtn.style.display = "none";
}

loadQuestion();
