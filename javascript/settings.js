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
    else {
        document.getElementById("musicOn").style.backgroundColor = "#008000";
        document.getElementById("musicOff").style.backgroundColor = "#FF3300";
    }
}

function soundOn(){
    sessionStorage.setItem('sound', 'on');
    buttonSound();
    soundSettings();
}

function soundOff(){
    sessionStorage.setItem('sound', 'off');
    soundSettings();
}

function soundSettings() {
    if(sessionStorage.getItem('sound') === 'off'){
        document.getElementById("soundOff").style.backgroundColor = "#008000";
        document.getElementById("soundOn").style.backgroundColor = "#FF3300";
    }
    else {
        document.getElementById("soundOn").style.backgroundColor = "#008000";
        document.getElementById("soundOff").style.backgroundColor = "#FF3300";
    }
}

function languageEnglish() {
    sessionStorage.setItem('language', 'english');
    buttonSound();
    languageSet();
}

function languageFrench() {
    sessionStorage.setItem('language', 'french');
    buttonSound();
    languageSet();
}

function languageSet() {
    if(sessionStorage.getItem('language') === 'english'){
        document.getElementById("lang1").style.backgroundColor = "#008000";
        document.getElementById("lang2").style.backgroundColor = "#FF3300";
        document.getElementById("headerText").innerHTML="Settings";
        document.getElementById("musicText").innerHTML="Music";
        document.getElementById("soundText").innerHTML="Sounds";
        document.getElementById("languageText").innerHTML="Languages";
        document.getElementById("returnHome").innerHTML="Back";
    }
    else {
        document.getElementById("lang2").style.backgroundColor = "#008000";
        document.getElementById("lang1").style.backgroundColor = "#FF3300";
        document.getElementById("headerText").innerHTML="Param&egravetres";
        document.getElementById("musicText").innerHTML="Musique";
        document.getElementById("soundText").innerHTML="Sonore";
        document.getElementById("languageText").innerHTML="Langue";
        document.getElementById("returnHome").innerHTML="Retourner";
    }
}

function buttonSound(){
    if(sessionStorage.getItem('sound') !== 'off'){
        var clickSound = new Audio('music/click.mp3');
        clickSound.play();
    }
}