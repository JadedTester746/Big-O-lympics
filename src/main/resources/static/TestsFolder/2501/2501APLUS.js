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
        q1: 'E',
        q2: 'B',
        q3: 'A',
        q4: 'B',
        q5: 'D',
        q6: 'C',
        q7: 'D',
        q8: 'D',
        q9: 'D',
        q10: 'B',
        q11: 'A',
        q12: 'B',
        q13: 'E',
        q14: 'B',
        q15: 'D',
        q16: 'E',
        q17: 'A',
        q18: 'B',
        q19: 'D',
        q20: 'D',
        q21: 'C',
        q22: 'D',
        q23: 'B',
        q24: 'D',
        q25: 'A',
        q26: 'C',
        q27: 'B',
        q28: 'B',
        q29: 'B',
        q30: 'C',
        q31: 'D',
        q32: 'B',
        q33: 'D',
        q34: 'C',
        q35: 'D',
        q36: 'D',
        q37: 'A',
        q38: 'B',
        q39: "[-76,2,-3,16,9,18,32,71,43,90,75,212,17]",
        q40: '9'
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
window.open("2501Key.html");
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

        if (timeRemaining<=0){
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