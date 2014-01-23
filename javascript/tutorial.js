function goBack(){
    buttonSound();
    window(location.href='mainMenu.html');
}

function musicOn(){
    sessionStorage.setItem('music', 'on');
    buttonSound();
    musicSettings();
}

function musicOff(){
    sessionStorage.setItem('music', 'off');
    buttonSound();
    musicSettings();
}

function musicSettings() {
    if(sessionStorage.getItem('music') === 'off'){
        document.getElementById("musicOff").style.backgroundColor = "#008000";
        document.getElementById("musicOn").style.backgroundColor = "#FF3300";
    }
}   

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

function languageSet(){
    if(sessionStorage.getItem('language') === 'english'){
        document.getElementById("gameInstructions").innerHTML="A monkey swings on vines to collect bananas. Each vine has a math question. To swing to the next vine, you must correctly answer the math question in 15 seconds. If time runs out, you lose a life! The objective of the game is to answer all the questions and gain the most points as you can. There are buttons to write the answer.";
        document.getElementById("gameInstructions").style.lineHeight = "34px";
        document.getElementById("returnHome").innerHTML="Back";
    }
    else {
        document.getElementById("gameInstructions").innerHTML="Un singe oscillant sur une vigne et essayer de va prend des bananes. Chaque vigne a une question de math&eacutematique. Si tu restes sur le vigne pour longtemps et si tu ne r&eacuteponse pas la question raison tu perds une vie. Si tu faire la question raison, tu continue. Tu aussi a 15 sec pour r&eacuteponse la question. Si tu prends des bananes, tu peut augmentation les pointes sur une c&ocirc;te, il y a des boutons pour &eacutecrire la r&eacuteponse.";
        document.getElementById("gameInstructions").style.lineHeight = "24px";
        document.getElementById("returnHome").innerHTML="Retourner";
    }
}