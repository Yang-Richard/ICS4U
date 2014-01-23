function goHome(){
    buttonSound();
    window(location.href='mainMenu.html');
}

function buttonSound(){
    if(sessionStorage.getItem('sound') !== 'off'){
        var clickSound = new Audio('music/click.mp3');
        clickSound.play();
    }
}

function difficulty(difficultyChosen){
    buttonSound();
    sessionStorage.gameDifficulty=difficultyChosen;
    window(location.href='loadingScreen.html');
}

function languageSet() {
    if(sessionStorage.getItem('language') === 'english'){
        document.getElementById("easy").innerHTML="Easy";
        document.getElementById("medium").innerHTML="Medium";
        document.getElementById("hard").innerHTML="Hard";
        document.getElementById("returnHome").innerHTML="Back";
    }
    else {
        document.getElementById("easy").innerHTML="Facile";
        document.getElementById("medium").innerHTML="Moyen";
        document.getElementById("hard").innerHTML="Difficile";
        document.getElementById("returnHome").innerHTML="Retourner";
    }
}