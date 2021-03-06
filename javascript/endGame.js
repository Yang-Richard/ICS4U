sessionStorage.outcome=0;
            
function goStart(){
    buttonSound();
    updateHighScore();
    window(location.href='chooseDifficulty.html');
}

function goHighscores(){
    buttonSound();
    updateHighScore();
    window(location.href='highScores.html');
}

function difficultyType(){
    switch(sessionStorage.gameDifficulty){
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

function updateHighScore(){
    var highScoreData;
    var lowestScore = 0;
    var currentDate = new Date();
    var playerName = document.getElementById('userName').value;

    if(playerName.length === 0){
        playerName = "Player";
    }
    else if (playerName.length > 8){
        playerName = playerName.substring(0,8);
    }

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

    if(highScoreData[difficultyType()][lowestScore][1] < sessionStorage.highScoreInput){
        highScoreData[difficultyType()][lowestScore][0] = playerName;
        highScoreData[difficultyType()][lowestScore][1] = sessionStorage.highScoreInput;
        highScoreData[difficultyType()][lowestScore][2] = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
        localStorage.highScoreData = JSON.stringify(highScoreData);
    }
}

function languageSet(){
    if(sessionStorage.getItem('language') === 'english'){
        document.getElementById('background').style.backgroundImage = 'url(images/endGameEnglish' + sessionStorage.outcome + '.png)';
        document.getElementById("return").innerHTML="Restart";
        document.getElementById("highscores").innerHTML="High Scores";
    }
    else{
        document.getElementById('background').style.backgroundImage = 'url(images/endGameFrench' + sessionStorage.outcome + '.png)';
        document.getElementById("return").innerHTML="Recommencer";
        document.getElementById("highscores").innerHTML="Haut Scores";
    }
}

function buttonSound(){
    if(sessionStorage.getItem('sound') !== 'off'){
        var clickSound = new Audio('music/click.mp3');
        clickSound.play();
    }
}

if(sessionStorage.getItem('sound') !== 'off'){
    var clickSound = new Audio('music/loseSound.mp3');
    clickSound.play();
}