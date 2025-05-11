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
        q2: 'D',
        q3: 'A',
        q4: 'A',
        q5: 'A',
        q6: 'C',
        q7: 'A',
        q8: 'A',
        q9: 'B',
        q10: 'D',
        q11: 'A',
        q12: 'C',
        q13: 'D',
        q14: 'C',
        q15: 'A',
        q16: 'D',
        q17: 'D',
        q18: 'E',
        q19: 'B',
        q20: 'A',
        q21: 'E',
        q22: 'B',
        q23: 'D',
        q24: 'A',
        q25: 'A',
        q26: 'A',
        q27: 'E',
        q28: 'B',
        q29: 'A',
        q30: 'E',
        q31: 'C',
        q32: 'D',
        q33: 'B',
        q34: 'C',
        q35: 'A',
        q36: 'C',
        q37: "<<",
        q38: '48',
        q39: "quick",
        q40: 'logN'
    }

let score = 0;
let correct = 0;
let numAttempt =0;
let totalQuestions = Object.keys(answers).length;
let missedQuestions = [];
for (let question in answers) {
    if (question === 'q39' || question === 'q40') continue;
    let userAnswer = document.querySelector(`input[name="${question}"]:checked`);
    if (userAnswer && userAnswer.value === answers[question]) {
        score+=6;
        correct++;
        numAttempt++;
        
    }
    else if (userAnswer){
        score-=2;
        numAttempt++;
        missedQuestions.push(question);
    }
    else{
        missedQuestions.push(question);
    }
}
const checkSpecificAnswer = (elemntId, correctAnswer) =>{
    const element = document.getElementById(elemntId);
    if (element){
        if (element.value == correctAnswer){
            score+=6;
            correct++;
            numAttempt++;
        }
        else if (element.value !== ""){
            score-=2;
            numAttempt++;
            missedQuestions.push(elemntId);
        }
        else{
            missedQuestions.push(elemntId);
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

fetch("/api/score", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
        testId: "2509APLUSTEST",
        score: score,
        accuracy: (correct/numAttempt)*100.0,
        missed: JSON.stringify(missedQuestions)
    }),
    credentials: "include" // needed to send session cookies for OAuth
})
.then(res => res.ok ? console.log("Score uploaded") : Promise.reject("Failed to upload"))
.catch(err => console.error(err));

window.open("2509Key.html");
const formElements = document.getElementById('quiz').elements;
for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = true;
}
clearInterval(timerInterval);
let button = document.createElement('button');
button.textContent = 'Go to home';
button.onclick = function() {
    window.location.href = '/index.html'
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