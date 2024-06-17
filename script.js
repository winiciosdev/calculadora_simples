let displayValue = '0';
let currentOperation = null;
let firstOperand = null;
let currentQuestion = null;
let currentQuestionIndex = 0;


//aqui colocamos algumas perguntas basicas para estimular o pensamento matematico do usuario
const questions = [
    { question: "quais números que somados resultam em 2?", answer: "2"},
    { question: "Quais números somados resultam em 4?", answer: "4" },
    { question: "Quais números multiplicados resultam em 6?", answer: "6" },
    { question: "Quais números subtraídos resultam em 2?", answer: "2" },
    { question: "Quais números divididos resultam em 2?", answer: "2" }
];

//mensagem de boas vindas e apresentação do programa

window.onload = function() {
    alert("Olá, seja bem-vindo à calculadora!");
    alert("Aqui você vai praticar seus conhecimentos matemáticos básicos. Divirta-se!");

    
    moveToNextQuestion();
    updateDisplay();


    document.addEventListener('keydown', handleKeyboardInput);
};

function appendNumber(number) {
    if (displayValue === '0') {
        displayValue = number.toString();
    } else {
        displayValue += number;
    }
    updateDisplay();
}

function setOperation(operation) {
    if (currentOperation !== null) {
        calculateResult();
    }
    firstOperand = parseFloat(displayValue);
    currentOperation = operation;
    displayValue = '0';
    updateDisplay();
}

function calculateResult() {
    if (currentOperation === null) {
        return;
    }
    const secondOperand = parseFloat(displayValue);
    let result;
    switch (currentOperation) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    displayValue = result.toString();
    currentOperation = null;
    updateDisplay();
    checkAnswer(displayValue);
}

function clearDisplay() {
    displayValue = '0';
    currentOperation = null;
    firstOperand = null;
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

function checkAnswer(answer) {
    if (answer === eval (currentQuestion.answer).toString()) {
        alert("Parabéns, você acertou!");
        moveToNextQuestion();
    } else {
        alert("Você errou, tente novamente!");
        clearDisplay();
    }
}

function moveToNextQuestion() {
    currentQuestion = questions[currentQuestionIndex];
    displayValue = '0';
    updateDisplay();
    const questionDisplay = document.getElementById('question');
    questionDisplay.textContent = currentQuestion.question;

    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        alert("Parabéns, você concluiu o jogo!");
        currentQuestionIndex = 0; 
    }
}

//reconhecer as teclas do teclado
function handleKeyboardInput(event) {
    const { key } = event;


    if (/\d/.test(key)) {
        appendNumber(parseInt(key));
    }


    if (['+', '-', '*', '/'].includes(key)) {
        setOperation(key);
    }


    if (key === 'Enter' || key === '=') {
        calculateResult();
    }


    if (key === 'Backspace' || key === 'Delete') {
        clearDisplay();
    }
}