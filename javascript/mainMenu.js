var music = new Audio('music/panamaHatNV.mp3');
music.loop = true;

function gameStart(){
    buttonSound();
    window(location.href='chooseDifficulty.html')
}

function goInstructions(){
    buttonSound();
    window(location.href='tutorial.html');
}

function goScores(){
    buttonSound();
    window(location.href='highScores.html');
}

function goSettings(){
    buttonSound();
    window(location.href='settings.html');
}

function buttonSound(){
    if(sessionStorage.getItem('sound') !== 'off'){
        var clickSound = new Audio('music/click.mp3');
        clickSound.play();
    }
}

function languageSet() {
    if(sessionStorage.getItem('language') === 'english'){
        document.getElementById("startButton").innerHTML="Start Game";
        document.getElementById("tutorialButton").innerHTML="Instructions";
        document.getElementById("highScoresButton").innerHTML="High Scores";
    }
    else {
        document.getElementById("startButton").innerHTML="Joue";
        document.getElementById("tutorialButton").innerHTML="Instructions";
        document.getElementById("highScoresButton").innerHTML="Haut Scores";
    }
}

function musicSet(){
    if(sessionStorage.getItem('music') === 'off'){
        music.stop();
    }
    else {
        music.play();
    }
}