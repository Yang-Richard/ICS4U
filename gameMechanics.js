
	var level = parseInt(sessionStorage.difficulty, 10);
	var terms = new Array();
	var score = 0;
	var time=15;

	function checkAnswer(){
		var compAnswer = terms[2];
		var userAnswer = parseInt(document.getElementById('userInput').value, 10);
	
		if (compAnswer == userAnswer){
			document.getElementById("check").innerHTML = "Correct!";
			stopTimer();
			score ++;
			document.getElementById("score").innerHTML = "Score: " + score;
		}
		else{
			document.getElementById("check").innerHTML = "Incorrect! The correct answer was " + compAnswer;
		}
	}
	
	function createQuestion(){
		//$('#type').append(sessionStorage.difficulty);
		var operator = createOperator(level);
		
		do{
			terms = createTerms(operator);
		} while(!isGoodAnswer(terms[2]));
		
		
		switch(operator)
		{
			case 0:
				terms[3] = "+";
				break;
			case 1:
				terms[3] = "-";
				break;
			case 2:
				terms[3] = "x";
				break;
			case 3:
				terms[3] = "/";
				break;
		}
		
		document.getElementById("question").innerHTML = terms[0] + ' ' + terms[3] + ' ' + terms[1] + ' = ________';
		time = 15;
		document.getElementById("timer").innerHTML=time;
		var myVar=setInterval(function(){myTimer()},1000);
	}
	
	
	function myTimer()
	{
		time = time - 1;
		document.getElementById("timer").innerHTML=time;
	}
	
	function createOperator(difficulty){
		
		switch(difficulty){
			case 0:
				return Math.floor(Math.random() * 2);
			case 1:
				return Math.floor(Math.random() * 2 + 2);
			case 2:
				return Math.floor(Math.random() * 4);
		}
	}
	

	function createTerms(operator){
		var terms = new Array();
		switch(operator)
		{
			case 0:
				terms[0] = Math.floor(Math.random() * 15);
				terms[1] = Math.floor(Math.random() * 15);
				terms[2] = terms[0] + terms[1];
				return terms;
			case 1:
				terms[0] = Math.floor(Math.random() * 15);
				terms[1] = Math.floor(Math.random() * 15);
				terms[2] = terms[0] - terms[1];
				return terms;
			case 2:
				terms[0] = Math.floor(Math.random() * 5);
				terms[1] = Math.floor(Math.random() * 5);
				terms[2] = terms[0] * terms[1];
				return terms;
			case 3:
				terms[0] = Math.floor(Math.random() * 50);
				terms[1] = Math.floor(Math.random() * 9) + 1;
				terms[2] = terms[0] / terms[1];
				return terms;
		}
	}
	

	function isGoodAnswer(answer){
		return answer == parseInt(answer) && answer >= 0;
	}
	