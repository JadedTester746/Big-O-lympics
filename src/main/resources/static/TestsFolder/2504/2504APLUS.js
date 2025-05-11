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
        q3: 'B',
        q4: 'A',
        q5: 'D',
        q6: 'E',
        q7: 'B',
        q8: 'B',
        q9: 'B',
        q10: 'A',
        q11: 'B',
        q12: 'B',
        q13: 'E',
        q14: 'B',
        q15: 'C',
        q16: 'A',
        q17: 'D',
        q18: 'A',
        q19: 'D',
        q20: 'A',
        q21: 'A',
        q22: 'E',
        q23: 'D',
        q24: 'C',
        q25: 'D',
        q26: 'A',
        q27: 'C',
        q28: 'A',
        q29: 'E',
        q30: 'B',
        q31: 'D',
        q32: 'A',
        q33: 'D',
        q34: 'A',
        q35: 'C',
        q36: 'D',
        q37: 'B',
        q38: 'D',
        q39: "5",
        q40: '7 14 9 16 25 29 22 43 54 37 36 212 78 56 34'
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
        testId: "2504APLUSTEST",
        score: score,
        accuracy: (correct/numAttempt)*100.0,
        missed: JSON.stringify(missedQuestions)
    }),
    credentials: "include" // needed to send session cookies for OAuth
})
.then(res => res.ok ? console.log("Score uploaded") : Promise.reject("Failed to upload"))
.catch(err => console.error(err));

window.open("2504Key.html");
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