var mathQuestion = "";
var mathAnswer = -1;
var score = 0;
var questionNumber = 1;
var lives = 5;
var timer = 15;
var userAnswer = "";
var myTimer;
var ctx;
var monkeyYPos = 0;
var backgroundPos = 0;

var background1 = new Image();
var background2 = new Image();
var monkey = new Image();
var banana = new Array();

var backgroundOneInfo = [[0, -330, 630, 320], [118,114,110.5,114]];
var backgroundTwoInfo = [[650, 320, 0, -330], [118,114,118,114]];

function init(){
    ctx=document.getElementById("jungleAnimation").getContext("2d");
    background1.src = 'images/background1.png';
    background2.src = 'images/background2.png';
    monkey.src = 'images/monkey.png';

    for (var a = 0; a < 6; a++){
        banana[a] = new Image();
        banana[a].src = 'images/banana' + ((a % 3) + 1) + '.png';
    }

    background1.onload = function() {
         drawBackgroundAndBananas();
         ctx.drawImage(monkey, 120, 40, 70, 70);  
    };
}

function countdown(){
    document.getElementById("score").innerHTML=score;
    document.getElementById("timer").innerHTML=timer;
    disableButtons();
    ctx.font="300px Arial";

    timer = 3;
    myTimer=setInterval(function(){
        drawBackgroundAndBananas();
        ctx.drawImage(monkey, 120, 40, 70, 70);  
        ctx.fillText("" + timer,240,350);

        timer = timer - 1;
        if (timer === -1){
            clearInterval(myTimer);
            game();
        }
    },1000);
}

function game(){
    createQuestion();
    enableButtons();
    timer = 15;// REMEMBER TO PUT BACK HERE
    userAnswer = "";
    document.getElementById("timer").innerHTML=timer;
    console.log(mathAnswer);

    for (var a = 0; a < 3; a++){
        banana[a].src = 'images/banana' + (a + 1) + '.png';
    }

    myTimer=setInterval(function(){
        timer = timer - 0.1;
        document.getElementById("timer").innerHTML=Math.round(timer);
        drawBackgroundAndBananas();
        ctx.drawImage(monkey, 120, 180 - (timer*9.3) , 70, 70);

        monkeyYPos = 180 - (timer*9.3);
        if (timer < 0){
            document.getElementById("timer").innerHTML="0";
            clearInterval(myTimer);
            disableButtons();
            lifeLost();
        }  
    },125); // Needs to be 150 for the calcInput function to work properly
}

function disableButtons(){
    for(var a = 0; a < 10; a++){
        document.getElementById("calc" + a).disabled = true; 
    }
    document.getElementById("backspace").disabled = true; 
}

function enableButtons(){
    for(var a = 0; a < 10; a++){
        document.getElementById("calc" + a).disabled = false; 
    }
    document.getElementById("backspace").disabled = false; 
}

function calculatorClicked(value){
    buttonSound();

    if(localStorage.getItem('sound') !== 'off'){
        var clickSound = new Audio('music/click.mp3');
        clickSound.play();
    }

    if (userAnswer.length < 3){
        userAnswer += value + "";
        editFooter();
    }

    if (parseInt(userAnswer) === mathAnswer){
        clearInterval(myTimer);

        var numBananas;
        if (timer > 10){
        numBananas = 3;
        }
        else if (timer > 5){
           numBananas = 2;
        }
        else{
            numBananas = 1;
        }

        disableButtons();
        userAnswer = "";
        questionNumber ++;
        nextQuestion(numBananas);
    }
    else{}
}

function nextQuestion(bananaType){
    var interval;
    if (bananaType === 3){
        interval = (monkeyYPos-10)/1.3;
    }
    else if(bananaType === 2){
        interval = (monkeyYPos-80)/1.3;
    }
    else {
        interval = (monkeyYPos-150)/1.3;
    }
    timer = 0;
    var playedBananaAudio = false;
    myTimer=setInterval(function(){
        timer = timer + 0.1;
        ctx.clearRect(0,0,652,500);
        ctx.drawImage(background1, backgroundOneInfo[0][backgroundPos], 0, 652, 500);
        ctx.drawImage(background2, backgroundTwoInfo[0][backgroundPos], 0, 652, 500);

        if (timer <=1.3){
            drawBackgroundAndBananas();
            ctx.drawImage(monkey, 125 + (timer*118), monkeyYPos - interval*timer , 70, 70);
        }
        else if (timer > 1.3 && timer <=2.8){    
            drawBackgroundAndBananas();
            if (bananaType === 3){
                banana[2].src = null;
            }
            else if(bananaType === 2){
                banana[1].src = null;
            }
            else {
                banana[0].src = null;
            } 
            ctx.drawImage(monkey, 125 + (timer*118), monkeyYPos - interval*(2.8-timer), 70, 70);

            if(!playedBananaAudio){
                gainBananas();
                playedBananaAudio = true;
            }
        }
        else{
            clearInterval(myTimer);
            drawBackgroundAndBananas();
            ctx.drawImage(monkey, 125 + (timer*118), monkeyYPos, 70, 70);
            score += bananaType;
            document.getElementById("score").innerHTML = score;

            if (questionNumber === 21){
                sessionStorage.highScoreInput=score;
                window(location.href='endGame.html');	
                sessionStorage.outcome = 1;
             }
            else{
                timer = -1;
                myTimer=setInterval(function(){
                    timer += 0.1;

                    if (timer > 0 && timer < 2.9)
                    {
                        ctx.clearRect(0,0,630,500);
                        ctx.drawImage(background1, backgroundOneInfo[0][backgroundPos]-(timer*backgroundOneInfo[1][backgroundPos]), 0, 652, 500);
                        ctx.drawImage(background2, backgroundTwoInfo[0][backgroundPos]-(timer*backgroundTwoInfo[1][backgroundPos]), 0, 652, 500);
                        ctx.drawImage(monkey, 444-(timer*116), monkeyYPos - (monkeyYPos-40)/2.9*timer, 70, 70);
                        ctx.drawImage(banana[0], 300-(timer*130), 150, 70, 30);
                        ctx.drawImage(banana[1], 300-(timer*130), 80, 70, 30);
                        ctx.drawImage(banana[2], 300-(timer*130), 10, 70, 30);
                        ctx.drawImage(banana[3], 650-(timer*125), 150, 70, 30);
                        ctx.drawImage(banana[4], 650-(timer*125), 80, 70, 30);
                        ctx.drawImage(banana[5], 650-(timer*125), 10, 70, 30); 
                    }
                    else if (timer > 2.9){
                        clearInterval(myTimer);                   
                        backgroundPos++;
                        if (backgroundPos === 4){
                            backgroundPos = 0;
                        }
                        game();
                    }
                    else{   
                    }
                },50);
            }
        } 
    },50);
}

function backspace(){
    userAnswer = userAnswer.substring(0, userAnswer.length - 1);
    editFooter();
}

function editFooter(){
    var tempFooter = mathQuestion.replace("___",userAnswer);
    document.getElementById("footer").innerHTML = tempFooter;
}

function lifeLost(){         
    timer = 0;
    myTimer=setInterval(function(){
        timer = timer + 0.1;
        drawBackgroundAndBananas();
        ctx.drawImage(monkey, 125, 180 + (timer*100) , 70, 70);

        if (timer > 2.5){
            clearInterval(myTimer);
            waterSplash();
            document.getElementById("life" + lives).style.opacity = 0;
            lives -= 1;

            if (lives === 0){
                sessionStorage.highScoreInput=score;
                sessionStorage.outcome = 0;
                window(location.href='endGame.html');
            }
            else{
                drawBackgroundAndBananas();
                timer = 0;
                myTimer=setInterval(function(){
                    timer = timer + 1;

                    if (timer % 2 === 0){
                        drawBackgroundAndBananas();
                        ctx.drawImage(monkey, 120, 40, 70, 70);
                    }
                    else{
                        drawBackgroundAndBananas();
                    }

                    if (timer === 6){
                        clearInterval(myTimer);
                        questionNumber ++;
                        game();
                    }  
                },500);
            }
        } 
    },50);
}

function drawBackgroundAndBananas(){
    ctx.clearRect(0,0,652,500);
    ctx.drawImage(background1, backgroundOneInfo[0][backgroundPos], 0, 652, 500);
    ctx.drawImage(background2, backgroundTwoInfo[0][backgroundPos], 0, 652, 500);
    ctx.drawImage(banana[0], 300, 150, 70, 30);
    ctx.drawImage(banana[1], 300, 80, 70, 30);
    ctx.drawImage(banana[2], 300, 10, 70, 30);
    ctx.drawImage(banana[3], 650, 150, 70, 30);
    ctx.drawImage(banana[4], 650, 80, 70, 30);
    ctx.drawImage(banana[5], 650, 10, 70, 30);   
}

function createQuestion(){
    switch(sessionStorage.gameDifficulty){
        case 'easy':
                generateEasyQuestion();
                break;
        case 'medium':
                generateMediumQuestion();
                break;
        case 'hard':
                generateHardQuestion();
                break;
    }	
    document.getElementById("footer").innerHTML = mathQuestion;
}

function generateQuestion(){
    var info = new Array();
    info[0] = Math.floor(Math.random() * 4);  

    do{
        info[2] = createTerm(info[0]);
        info[3] = createTerm(info[0]);
        switch(info[0])
        {
            case 0:
                    info[1] = info[2] + info[3];
                    return info; 
            case 1:
                    info[1] = info[2] - info[3];
                    return info; 
            case 2:
                    info[1] = info[2] * info[3];
                    return info; 
            case 3:
                    var temp = info[2]*info[3];
                    info[1] = info[3];
                    info[3] = info[2];
                    info[2] = temp;
                    return info; 
        }
    } while(info[0] === 3 && info[3] === 0);
}

function generateEasyQuestion(){
    do{
        var info = generateQuestion();
        mathAnswer = info[1];
        mathQuestion = info[2] + " " + determineOperator(info[0]) + " " + info[3] + " = ___";
        catchDivideZeroException = mathQuestion.search("/ 0");
    }while(mathAnswer < 0); 
}

function generateMediumQuestion(){
    do{
        var info = generateQuestion();
        if (info[0] === 0 || info[0] === 1)
            info[4] = Math.floor(Math.random() * 2);
        else
            info[4] = 2;
        info[5] = createTerm(info[4]);

        switch(info[4])
        {
            case 0:
                mathAnswer =  mathAnswer + info[5];
                mathQuestion = info[2] + " " + determineOperator(info[0]) + " " + info[3] + " + " + info[5] + " = ___";
                break;
            case 1:
                mathAnswer =  mathAnswer - info[5];
                mathQuestion = info[2] + " " + determineOperator(info[0]) + " " + info[3] + " - " + info[5] + " = ___";
                break;
            case 2:
                mathAnswer =  mathAnswer * info[5];
                mathQuestion = info[2] + " " + determineOperator(info[0]) + " " + info[3] + " x " + info[5] + " = ___";
                break;
        } 
    } while(mathAnswer < 0);  
}

function generateHardQuestion(){
    do{
        var info = generateQuestion();
        mathAnswer = info[3];
        mathQuestion = info[2] + " " + determineOperator(info[0]) + " ___ = " + info[1];
    } while(mathAnswer < 0 ||(info[0] === 2 && info[1] === 0));
}

function determineOperator(operator){
    switch(operator){
        case 0:
            return "+";
        case 1:
            return "-";
        case 2:
             return "x";
        case 3:
            return "/";
    }
}

function createTerm(operator){
    switch(operator){
        case 0:
        case 1:
                return Math.floor(Math.random() * 50);
        case 2:
        case 3:
                return Math.floor(Math.random() * 10);
    }
}

function buttonSound(){
    if(sessionStorage.getItem('sound') !== 'off'){
        var clickSound = new Audio('music/click.mp3');
        clickSound.play();
    }
}

function waterSplash(){
    if(sessionStorage.getItem('sound') !== 'off'){
        var clickSound = new Audio('music/waterSplash.mp3');
        clickSound.play();
    }
}

 function gainBananas(){
    if(sessionStorage.getItem('sound') !== 'off'){
        var clickSound = new Audio('music/gainBanana.mp3');
        clickSound.play();
    }
 }

function languageSet(){
    if(sessionStorage.getItem('language') === 'english'){
        document.getElementById('lives').style.backgroundImage = 'url(images/livesEnglish.png)';
        document.getElementById('points').style.backgroundImage = 'url(images/pointsEnglish.png)';
        document.getElementById('time').style.backgroundImage = 'url(images/timeEnglish.png)';
        document.getElementById('calculator').style.backgroundImage = 'url(images/calcEnglish.png)';
    }
    else{
        document.getElementById('lives').style.backgroundImage = 'url(images/livesFrench.png)';
        document.getElementById('points').style.backgroundImage = 'url(images/pointsFrench.png)';
        document.getElementById('time').style.backgroundImage = 'url(images/timeFrench.png)';
        document.getElementById('calculator').style.backgroundImage = 'url(images/calcFrench.png)';
    }
}