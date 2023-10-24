let scores = {
    joueur1: 0,
    joueur2: 0
};

let equipe1 = [];
let equipe2 = [];

function startGame() {
    // Récupérez les noms des équipes
    let teamName1 = document.getElementById("teamName1").value;
    let teamName2 = document.getElementById("teamName2").value;

    equipe1 = [
        document.getElementById("joueur1Player1").value,
        document.getElementById("joueur1Player2").value,
        document.getElementById("joueur1Player3").value
    ];

    equipe2 = [
        document.getElementById("joueur2Player1").value,
        document.getElementById("joueur2Player2").value,
        document.getElementById("joueur2Player3").value
    ];

    document.getElementById("joueur1Display").textContent = teamName1;
    document.getElementById("joueur2Display").textContent = teamName2;


    document.getElementById("playerInput").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
}

let currentJoueur = null;

function incrementScore(joueur) {
    currentJoueur = joueur;
    let select = document.getElementById("scorerSelect");
    select.innerHTML = "";  
    let team = (joueur === "joueur1") ? equipe1 : equipe2;
    for(let player of team) {
        if(player) {
            let option = document.createElement("option");
            option.value = player;
            option.textContent = player;
            select.appendChild(option);
        }
    }
    document.getElementById("goalScorerModal").style.display = "block";
}
function confirmGoal() {
    if (currentJoueur) {
        scores[currentJoueur]++;
        updateDisplay(currentJoueur);
        
        let scorer = document.getElementById("scorerSelect").value;

        // Jouer le son et obtenir l'index du son joué.
        let soundIndex = playRandomSound(scorer);

        // Choisir l'image correspondant à l'index du son.
        let imagePath = `./images/${scorer}_${soundIndex}.png`;
        let image = document.getElementById("goalImage");
        image.src = imagePath;

        document.getElementById("goalOverlay").style.display = "flex";
        document.getElementById("goalScorerModal").style.display = "none";

        setTimeout(() => {
            document.getElementById("goalOverlay").style.display = "none";
        }, 4600);
    } else {
        console.error("Aucun joueur sélectionné");
    }
}



function decrementScore(joueur) {
    scores[joueur] = Math.max(0, scores[joueur] - 1);
    updateDisplay(joueur);
}

function updateDisplay(joueur) {
    let scoreElement;
    let teamName;
    if (joueur === 'joueur1') {
        scoreElement = document.getElementById("score1");
        teamName = document.getElementById("teamName1").value;
    } else {
        scoreElement = document.getElementById("score2");
        teamName = document.getElementById("teamName2").value;
    }
    scoreElement.textContent = scores[joueur];
}

function changeTeams() {
    document.getElementById("goalScorerModal").style.display = "none";
    document.getElementById("playerInput").style.display = "block";
    document.getElementById("gameArea").style.display = "none";
}

function resetScores() {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser les scores?")) {
        scores.joueur1 = 0;
        scores.joueur2 = 0;
        updateDisplay('joueur1');
        updateDisplay('joueur2');
    }
}

// Gestion des cookies
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

document.addEventListener('DOMContentLoaded', () => {
    let savedJoueur1 = getCookie("joueur1");
    let savedJoueur2 = getCookie("joueur2");
    let savedJoueur1Score = getCookie("joueur1Score");
    let savedJoueur2Score = getCookie("joueur2Score");

    if (savedJoueur1 && savedJoueur2) {
        document.getElementById("joueur1Player1").value = savedJoueur1;
        document.getElementById("joueur2Player1").value = savedJoueur2;

        if (savedJoueur1Score) {
            scores.joueur1 = parseInt(savedJoueur1Score);
        }
        if (savedJoueur2Score) {
            scores.joueur2 = parseInt(savedJoueur2Score);
        }
        startGame();
    }
});


function playRandomSound(playerName) {
    // Génération d'un nombre aléatoire entre 1 et 2
    let randomIndex = Math.floor(Math.random() * 2) + 1; 
    let soundName = `${playerName}_${randomIndex}`;
    let soundPath = `./sounds/${soundName}.mp3`;

    let sound = new Audio(soundPath);
    sound.play();

    return randomIndex; // Cet index sera utilisé pour sélectionner l'image correspondante
}
