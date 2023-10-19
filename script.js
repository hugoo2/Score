let scores = {
    joueur1: 0,
    joueur2: 0
};

function startGame() {
    let joueur1Name = document.getElementById("joueur1Name").value;
    let joueur2Name = document.getElementById("joueur2Name").value;
    
    // Sauvegarder les noms dans les cookies
    setCookie("joueur1", joueur1Name, 7);
    setCookie("joueur2", joueur2Name, 7);

    document.getElementById("joueur1Display").textContent = joueur1Name;
    document.getElementById("joueur2Display").textContent = joueur2Name;

    document.getElementById("playerInput").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
}

function incrementScore(joueur) {
    scores[joueur]++;
    updateDisplay(joueur);
}

function decrementScore(joueur) {
    scores[joueur] = Math.max(0, scores[joueur] - 1);  // pour éviter des valeurs négatives
    updateDisplay(joueur);
}

function updateDisplay(joueur) {
    document.getElementById("score" + joueur.charAt(joueur.length - 1)).textContent = scores[joueur];
}

function changeTeams() {
    document.getElementById("playerInput").style.display = "block";
    document.getElementById("gameArea").style.display = "none";
}

// Fonctions pour gérer les cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Au chargement, vérifiez les cookies pour les noms d'équipe précédemment définis
document.addEventListener('DOMContentLoaded', (event) => {
    var savedJoueur1 = getCookie("joueur1");
    var savedJoueur2 = getCookie("joueur2");

    if (savedJoueur1) {
        document.getElementById("joueur1Name").value = savedJoueur1;
    }
    if (savedJoueur2) {
        document.getElementById("joueur2Name").value = savedJoueur2;
    }
});


// Au chargement, vérifiez les cookies pour les noms d'équipe précédemment définis
document.addEventListener('DOMContentLoaded', (event) => {
    var savedJoueur1 = getCookie("joueur1");
    var savedJoueur2 = getCookie("joueur2");

    if (savedJoueur1 && savedJoueur2) {
        document.getElementById("joueur1Name").value = savedJoueur1;
        document.getElementById("joueur2Name").value = savedJoueur2;

        startGame();  // initialiser le jeu avec les noms enregistrés
    }
});


function resetScores() {
    const userConfirmed = confirm("Êtes-vous sûr de vouloir réinitialiser les scores?");
    
    if (userConfirmed) {
        scores.joueur1 = 0;
        scores.joueur2 = 0;
        updateDisplay('joueur1');
        updateDisplay('joueur2');
    }
}
