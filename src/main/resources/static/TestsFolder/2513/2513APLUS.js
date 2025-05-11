document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('click', function() {
        if (this.previous) {
            this.checked = false;
        }
        this.previous = this.checked;
    });
});
let timerInterval;
function checkAnswers() {
    const answers = {
        q1: 'A',
        q2: 'D',
        q3: 'C',
        q4: 'B',
        q5: 'D',
        q6: 'B',
        q7: 'E',
        q8: 'D',
        q9: 'A',
        q10: 'D',
        q11: 'D',
        q12: 'D',
        q13: 'C',
        q14: 'E',
        q15: 'C',
        q16: 'A',
        q17: 'E',
        q18: 'B',
        q19: 'A',
        q20: 'C',
        q21: 'C',
        q22: 'B',
        q23: 'D',
        q24: 'C',
        q25: 'A',
        q26: 'A',
        q27: 'B',
        q28: 'B',
        q29: 'D',
        q30: 'D',
        q31: 'A',
        q32: 'A',
        q33: 'C',
        q34: 'B',
        q35: 'C',
        q36: 'E',
        q37: 'B',
        q38: 'E',
        q39: "(A ^ B) | (B & C)",
        q40: '10010111'
    }

let score = 0;
let correct = 0;
let numAttempt =0;
let totalQuestions = Object.keys(answers).length;

for (let question in answers) {
    let userAnswer = document.querySelector(`input[name="${question}"]:checked`);
    if (userAnswer && userAnswer.value === answers[question]) {
        score+=6;
        correct++;
        numAttempt++;
    }
    else if (userAnswer){
        score-=2;
        numAttempt++;
    }
}
const checkSpecificAnswer = (elemntId, correctAnswer) =>{
    const element = document.getElementById(elemntId);
    if (element){
        const userInput = String(element.value).trim().toUpperCase();
        const expectedAnswer = String(correctAnswer).trim().toUpperCase();

        if (userInput === expectedAnswer){
            score += 6;
            correct++;
            numAttempt++;
        } else if (element.value !== ""){
            score -= 2;
            numAttempt++;
        }
    }
};
checkSpecificAnswer('q39', answers['q39']);
checkSpecificAnswer('q40', answers['q40']);
let resultDiv = document.getElementById('result');
if (numAttempt==0){
    resultDiv.innerHTML = 'You did not answer any questions, you got a 0.';
}
else{
resultDiv.innerHTML = `You scored a ${score} with an accuracy of ${(correct/numAttempt)*100}%.`;
}
window.open("2513Key.html");
const formElements = document.getElementById('quiz').elements;
for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = true;
}
clearInterval(timerInterval);
let button = document.createElement('button');
button.textContent = 'Go to Test Index';
button.onclick = function() {
    window.location.href = 'Test Indexd.html'
};
resultDiv.appendChild(button);
}
function startTimer() {
    const now = new Date();
    const quizEndTime = new Date(now.getTime() + 45 * 60 * 1000);
    const timerElement = document.getElementById("timer");
    function updateTimer(){
        const currentTime = new Date().getTime();
        const timeRemaining = quizEndTime-currentTime;

        if (timeRemaining<=0){d
            clearInterval(timerInterval);
            timerElement.textContent = "Time's up!";
            checkAnswers();
        }else{
            const minutes = Math.floor((timeRemaining%(1000*60*60))/(1000*60));
            const seconds = Math.floor((timeRemaining % (1000*60))/1000);
            timerElement.textContent = `Time remaining: ${minutes}m ${seconds}s`;
        }
    }
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}
window.onload = startTimer;