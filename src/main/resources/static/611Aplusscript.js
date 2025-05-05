function checkAnswers() {
    const answers = {
        q1: 'B',
        q2: 'C',
        q3: 'D',
        q4: 'D',
        q5: 'B',
        q6: 'A',
        q7: 'D',
        q8: 'D',
        q9: 'E',
        q10: 'E',
        q11: 'B',
        q12: 'B',
        q13: 'A',
        q14: 'B',
        q15: 'D',
        q16: 'C',
        q17: 'E',
        q18: 'C',
        q19: 'C',
        q20: 'C',
        q21: 'D',
        q22: 'D',
        q23: 'A',
        q24: 'B',
        q25: 'D',
        q26: 'B',
        q27: 'C',
        q28: 'C',
        q29: 'A',
        q30: 'A',
        q31: 'C',
        q32: 'D',
        q33: 'C',
        q34: 'A',
        q35: 'C',
        q36: 'E',
        q37: 'C',
        q38: 'A',
        q39: "+*35/62",
        q40: '8'
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
if (document.getElementById('q39').value==answers["q39"]){
    score+=6;
    correct++;
    numAttempt++;
}
else if (document.getElementById('q39')==null){
    score-=2;
    numAttempt++;
}
if (document.getElementById('q40').value==answers["q40"]){
    score+=6;
    correct++;
    numAttempt++;
}
else if (document.getElementById('q40')==null){
    score-=2;
    numAttempt++;
}
let resultDiv = document.getElementById('result');
if (numAttempt==0){
    resultDiv.innerHTML = 'You did not answer any questions, you got a 0.';
}
else{
resultDiv.innerHTML = `You scored a ${score} with an accuracy of ${(correct/numAttempt)*100}%.`;
}
window.open("Key1.html");
const formElements = document.getElementById('quiz').elements;
for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = true;
}
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
    const timerInterval = setInterval(updateTimer, 1000);
}
window.onload = startTimer;