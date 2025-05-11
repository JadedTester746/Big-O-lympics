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
        q2: 'C',
        q3: 'A',
        q4: 'C',
        q5: 'C',
        q6: 'D',
        q7: 'B',
        q8: 'B',
        q9: 'D',
        q10: 'B',
        q11: 'D',
        q12: 'A',
        q13: 'D',
        q14: 'E',
        q15: 'B',
        q16: 'C',
        q17: 'A',
        q18: 'C',
        q19: 'D',
        q20: 'A',
        q21: 'B',
        q22: 'D',
        q23: 'D',
        q24: 'B',
        q25: 'C',
        q26: 'D',
        q27: 'E',
        q28: 'A',
        q29: 'A',
        q30: 'B',
        q31: 'A',
        q32: 'C',
        q33: 'C',
        q34: 'B',
        q35: 'C',
        q36: 'A',
        q37: 'A',
        q38: 'B',
        q39: "37 (A – G – E – D)",
        q40: '00010001'
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
window.open("2512Key.html");
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