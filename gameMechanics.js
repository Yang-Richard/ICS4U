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
        var backgroundPos = 1;
        
        var background1 = new Image();
        var background2 = new Image();
        var monkey = new Image();
        var banana1 = new Image();
        var banana2 = new Image();
        var banana3 = new Image();
        
        var banana4 = new Image();
        var banana5 = new Image();
        var banana6 = new Image();
        
        function init(){
            ctx=document.getElementById("jungleAnimation").getContext("2d");
            
            background1.src = 'images/background1.png';
            background2.src = 'images/background2.png';
            monkey.src = 'images/monkey.png';
            banana1.src = 'images/banana1.png';
            banana2.src = 'images/banana2.png';
            banana3.src = 'images/banana3.png';
            
            banana4.src = 'images/banana1.png';
            banana5.src = 'images/banana2.png';
            banana6.src = 'images/banana3.png';
            
            background1.onload = function() {
                 ctx.drawImage(background1, 0, 0, 652, 500);
                 ctx.drawImage(monkey, 120, 40, 70, 70);
                 ctx.drawImage(banana1, 300, 160, 70, 30);
                 ctx.drawImage(banana2, 300, 90, 70, 30);
                 ctx.drawImage(banana3, 300, 20, 70, 30);
                 ctx.drawImage(banana4, 650, 160, 70, 30);
                 ctx.drawImage(banana5, 650, 90, 70, 30);
                 ctx.drawImage(banana6, 650, 20, 70, 30);    
            };

        }
        
        function countdown(){
            document.getElementById("score").innerHTML=score;
            document.getElementById("timer").innerHTML=timer;
            disableButtons();
            
            timer = 1;
            myTimer=setInterval(function(){
                timer = timer - 1;
                // INITIAL COUNTDOWN CODE

                if (timer === 0){
                    clearInterval(myTimer);
                    game();
                }
            },1000);
        }

        function game(){
            createQuestion();
            enableButtons()
            timer = 15;// REMEMBER TO PUT BACK HERE
            userAnswer = "";
            document.getElementById("timer").innerHTML=timer;
             
            banana1.src = 'images/banana1.png';
            banana2.src = 'images/banana2.png';
            banana3.src = 'images/banana3.png';
            
            myTimer=setInterval(function(){
                timer = timer - 0.1;
                document.getElementById("timer").innerHTML=Math.floor(timer);
                drawBackgroundAndBananas();
                ctx.drawImage(monkey, 120, 180 - (timer*9.3) , 70, 70);
                
                monkeyYPos = 180 - (timer*9.3);

                if (timer < 0){
                    document.getElementById("timer").innerHTML="0";
                    clearInterval(myTimer);
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
            if(localStorage.getItem('sound') != 'off'){
                    var clickSound = new Audio('music/click.mp3');
                    clickSound.play();
            }
            
            userAnswer += value + "";
            editFooter();
           
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
                interval = (monkeyYPos-40);
            }
            else if(bananaType === 2){
                interval = (monkeyYPos-40);
            }
            else {
                interval = (monkeyYPos-40);
            }
            timer = 0;
            myTimer=setInterval(function(){
                timer = timer + 0.1;
                ctx.clearRect(0,0,652,500);
                ctx.drawImage(background1, getBackgroundPos(0), 0, 652, 500);
                ctx.drawImage(background2, getBackgroundPos(1), 0, 652, 500);
                
		if (timer < 1){
                    drawBackgroundAndBananas();
                    ctx.drawImage(monkey, 125 + (timer*118), monkeyYPos - interval*timer , 70, 70);
                }
                else if (timer > 1 && timer <=1.3){
                    drawBackgroundAndBananas();
                    ctx.drawImage(monkey, 125 + (timer*118), 40, 70, 70);
                }
                else if (timer > 1.3 && timer <=2.8){    
                    drawBackgroundAndBananas();
                    if (bananaType === 3){
                        banana3.src = null;
                    }
                    else if(bananaType === 2){
                        banana2.src = null;
                    }
                    else {
                        banana1.src = null;
                    } 
                    ctx.drawImage(monkey, 125 + (timer*118), 40, 70, 70);
                }
                else{
                    clearInterval(myTimer);
                    drawBackgroundAndBananas();
                    ctx.drawImage(monkey, 125 + (timer*118), 40, 70, 70);
                    score += bananaType;
                    document.getElementById("score").innerHTML = score;
                    
                    if (questionNumber === 21){
                        sessionStorage.highScoreInput=score;
                        setTimeout(function(){window(location.href='Game.html')}, 400)	
                     }
                    else{
                        timer = -1;
                        myTimer=setInterval(function(){
                            timer += 0.1;
                            
                            if (timer > 0 && timer < 2.9)
                            {
                                ctx.clearRect(0,0,652,500);
                                ctx.drawImage(background1, getBackgroundPos(0)-(timer*118), 0, 652, 500);
                                ctx.drawImage(background2, getBackgroundPos(1)-(timer*118), 0, 652, 500);
                                ctx.drawImage(monkey, 444-(timer*116), 40, 70, 70);
                                ctx.drawImage(banana1, 300-(timer*130), 160, 70, 30);
                                ctx.drawImage(banana2, 300-(timer*130), 90, 70, 30);
                                ctx.drawImage(banana3, 300-(timer*130), 20, 70, 30);
                                ctx.drawImage(banana4, 650-(timer*125), 160, 70, 30);
                                ctx.drawImage(banana5, 650-(timer*125), 90, 70, 30);
                                ctx.drawImage(banana6, 650-(timer*125), 20, 70, 30); 
                            }
                            else if (timer > 2.9){
                                clearInterval(myTimer);                   
                                backgroundPos++;
                                if (backgroundPos === 5){
                                    backgroundPos = 1;
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
                    document.getElementById("life" + lives).style.opacity = 0;
                    lives -= 1;
                    
                    if (lives === 0){
                        sessionStorage.highScoreInput=score;
                        setTimeout(function(){window(location.href='endGame.html')}, 400)
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
            ctx.drawImage(background1, getBackgroundPos(0), 0, 652, 500);
            ctx.drawImage(background2, getBackgroundPos(1), 0, 652, 500);
            ctx.drawImage(banana1, 300, 160, 70, 30);
            ctx.drawImage(banana2, 300, 90, 70, 30);
            ctx.drawImage(banana3, 300, 20, 70, 30);
            ctx.drawImage(banana4, 650, 160, 70, 30);
            ctx.drawImage(banana5, 650, 90, 70, 30);
            ctx.drawImage(banana6, 650, 20, 70, 30);   
        }
        
        function getBackgroundPos(backgroundValue)
        {
            var returnValue  = backgroundPos + (backgroundValue*4);
            
            switch(returnValue){
                case 1:
                    return 0;
                case 2:
                    return -330;
                case 3:
                    return 630;    
                case 4:
                    return 300; 
                case 5:
                    return 630;
                case 6:
                    return 300;
                case 7:
                    return 0;    
                case 8:
                    return -330; 
            }  
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
	}
        
       function generateEasyQuestion(){
            do{
                var info = generateQuestion();
                mathAnswer = info[1];
                mathQuestion = info[2] + " " + determineOperator(info[0]) + " " + info[3] + " = ___";
            }while(mathAnswer < 0); 
       }
       
        function generateMediumQuestion(){
            do{
                var info = generateQuestion();
                if (info[0] === 0 || info[0] === 1)
                    info[4] = Math.floor(Math.random() * 2);
                else
                    info[4] = 2
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
            }while(mathAnswer < 0);  
	}
        
        function generateHardQuestion(){
            do{
                var info = generateQuestion();
                mathAnswer = info[3];
                mathQuestion = info[2] + " " + determineOperator(info[0]) + " ___ = " + info[1];
            }while(mathAnswer < 0);
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
        
        function languageSet(){
            if(localStorage.getItem('language') == 'english'){
                document.getElementById('lives').style.backgroundImage = 'url(images/livesEnglish.png)';
                document.getElementById('points').style.backgroundImage = 'url(images/pointsEnglish.png)';
                document.getElementById('time').style.backgroundImage = 'url(images/timeEnglish.png)';
                document.getElementById('calculator').style.backgroundImage = 'url(images/calc.png)';
            }
            else{
                document.getElementById('lives').style.backgroundImage = 'url(images/livesFrench.png)';
                document.getElementById('points').style.backgroundImage = 'url(images/pointsFrench.png)';
                document.getElementById('time').style.backgroundImage = 'url(images/timeFrench.png)';
                document.getElementById('calculator').style.backgroundImage = 'url(images/calc.png)';
            }
        }