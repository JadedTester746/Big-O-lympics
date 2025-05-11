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
        q1: 'B',
        q2: 'B',
        q3: 'B',
        q4: 'E',
        q5: 'B',
        q6: 'D',
        q7: 'A',
        q8: 'C',
        q9: 'D',
        q10: 'A',
        q11: 'E',
        q12: 'D',
        q13: 'C',
        q14: 'C',
        q15: 'E',
        q16: 'A',
        q17: 'A',
        q18: 'D',
        q19: 'B',
        q20: 'C',
        q21: 'C',
        q22: 'D',
        q23: 'A',
        q24: 'A',
        q25: 'B',
        q26: 'E',
        q27: 'D',
        q28: 'D',
        q29: 'B',
        q30: 'A',
        q31: 'A',
        q32: 'E',
        q33: 'B',
        q34: 'C',
        q35: 'A',
        q36: 'left',
        q37: '>>',
        q38: '51',
        q39: "48",
        q40: 'merge'
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
checkSpecificAnswer('q37', answers['q37']);
checkSpecificAnswer('q38', answers['q38']);
checkSpecificAnswer('q39', answers['q39']);
checkSpecificAnswer('q40', answers['q40']);
let resultDiv = document.getElementById('result');
if (numAttempt==0){
    resultDiv.innerHTML = 'You did not answer any questions, you got a 0.';
}
else{
resultDiv.innerHTML = `You scored a ${score} with an accuracy of ${(correct/numAttempt)*100}%.`;
}
window.open("2507Key.html");
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