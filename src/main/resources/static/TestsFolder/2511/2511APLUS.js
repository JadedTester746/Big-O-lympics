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
        q1: 'D',
        q2: 'E',
        q3: 'A',
        q4: 'C',
        q5: 'B',
        q6: 'C',
        q7: 'E',
        q8: 'A',
        q9: 'B',
        q10: 'D',
        q11: 'C',
        q12: 'D',
        q13: 'C',
        q14: 'A',
        q15: 'B',
        q16: 'E',
        q17: 'A',
        q18: 'A',
        q19: 'A',
        q20: 'D',
        q21: 'B',
        q22: 'D',
        q23: 'D',
        q24: 'B',
        q25: 'B',
        q26: 'C',
        q27: 'B',
        q28: 'A',
        q29: 'D',
        q30: 'E',
        q31: 'B',
        q32: 'E',
        q33: 'D',
        q34: 'C',
        q35: 'E',
        q36: 'D',
        q37: 'D',
        q38: 'B',
        q39: "1110 1111",
        q40: '7'
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
        testId: "2511APLUSTEST",
        score: score,
        accuracy: (correct/numAttempt)*100.0,
        missed: JSON.stringify(missedQuestions)
    }),
    credentials: "include" // needed to send session cookies for OAuth
})
.then(res => res.ok ? console.log("Score uploaded") : Promise.reject("Failed to upload"))
.catch(err => console.error(err));

window.open("2511Key.html");
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