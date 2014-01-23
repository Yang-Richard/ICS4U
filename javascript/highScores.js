var scoreId = 'easy';

function buttonSound(){
    if(sessionStorage.getItem('sound') !== 'off'){
        var clickSound = new Audio('music/click.mp3');
        clickSound.play();
    }
}

function goHome(){
    buttonSound();
    window(location.href='mainMenu.html');
}

function highScoreEasy() {
    buttonSound();
    scoreId = 'easy';
    writeHighscores();
}

function highScoreMedium() {
    buttonSound();
    scoreId = 'medium';
    writeHighscores();
}

function highScoreHard() {
    buttonSound();
    scoreId = 'hard';
    writeHighscores();
}

function difficultyType(){
    switch(scoreId){
        case 'easy':
            return 0;
        case 'medium':
            return 1;
        case 'hard':
            return 2;  
        default:
            console.log("gameDifficulty can not be managed.");
            break;
    }
}

function resetHighscores(){
    var highScoreData = [[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
                        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
                        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]];
    localStorage.highScoreData = JSON.stringify(highScoreData);
    console.log("highscores reset");
}

function writeHighscores(){
    var highScoreData;
    var alreadyInput = "";
    var lowestScore = 0;

    if(localStorage.highScoreData){
        highScoreData = JSON.parse(localStorage.highScoreData);
    }
    else{
        highScoreData = [[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
                        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
                        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]];
    }      
    
    for(var a = 0; a < 10; a++){
         if (highScoreData[difficultyType()][a][1] < highScoreData[difficultyType()][lowestScore][1]){
             lowestScore=a;
         }
    } 
    
    for(var a = 0; a < 10; a++){
        var highestScore = lowestScore;// start it at the array number of the lowest score value
        for(var b = 0; b < 10; b++){
            if (highScoreData[difficultyType()][b][1] >= highScoreData[difficultyType()][highestScore][1] && alreadyInput.indexOf(b) === -1){
                highestScore=b;
            }
        }
        alreadyInput += "" + highestScore;
        if(highScoreData[difficultyType()][highestScore][1] !== 0)
        {
            document.getElementById('userName' + (a+1)).innerHTML=highScoreData[difficultyType()][highestScore][0];
            document.getElementById('userScore' + (a+1)).innerHTML=highScoreData[difficultyType()][highestScore][1];
            document.getElementById('userDate' + (a+1)).innerHTML=highScoreData[difficultyType()][highestScore][2];
        }
        else{
            document.getElementById('userName' + (a+1)).innerHTML="-";
            document.getElementById('userScore' + (a+1)).innerHTML="-";
            document.getElementById('userDate' + (a+1)).innerHTML="-";
        }
    }
}

function languageSet() {
    if(sessionStorage.getItem('language') === 'english'){
        document.getElementById("easy").innerHTML="Easy";
        document.getElementById("medium").innerHTML="Medium";
        document.getElementById("hard").innerHTML="Hard";
        document.getElementById("returnHome").innerHTML="Back";
        document.getElementById("rank").innerHTML="Rank";
        document.getElementById("name").innerHTML="Name";
        document.getElementById("score").innerHTML="Score";
        document.getElementById("date").innerHTML="Date";
    }
    else {
        document.getElementById("easy").innerHTML="Facile";
        document.getElementById("medium").innerHTML="Moyen";
        document.getElementById("hard").innerHTML="Difficile";
        document.getElementById("returnHome").innerHTML="Retourner";
        document.getElementById("rank").innerHTML="Place";
        document.getElementById("name").innerHTML="Nom";
        document.getElementById("score").innerHTML="Score";
        document.getElementById("date").innerHTML="Jour";
    }
}