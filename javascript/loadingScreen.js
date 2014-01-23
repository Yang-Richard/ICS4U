function goStart(){
    buttonSound();
    window(location.href='game.html');
}

function buttonSound(){
    if(sessionStorage.getItem('sound') !== 'off'){
            var clickSound = new Audio('music/click.mp3');
            clickSound.play();
    }
}

setTimeout(function(){document.getElementById('loadButton').style.display = "inline-block";},3000);

function languageSet(){
    if(sessionStorage.getItem('language') === 'english'){
        document.getElementById("loadButton").innerHTML="Start Game";
        document.getElementById("story").innerHTML="The monkey king has almost destroy the island. Banane, a monkey who loves bananas and life on the island, has decide to stop the king. He must swinging on vines and collect bananas by answering mathematics questions. There is water under the vines, so make sure that he doesn't fall!";				
        document.getElementById("story").style.lineHeight = "26px";
    }
    else {
        document.getElementById("loadButton").innerHTML="Joue";
        document.getElementById("story").innerHTML="Une singe qui est un roi presque d&eacutetruire l'&icircle. Banane, une singe qui aime des bananes et vie sur l'&icircle d&eacutecider qu'il veut arr&ecirct le roi. Banane oscillant sur les vignes et ramasse les bananes. Il r&eacuteponse des math&eacutematiques questions. Il y a l'eau sous les vignes alors, Banane ne veut pas tomber dans l'eau.";								
        document.getElementById("story").style.lineHeight = "20px";
    }
}
