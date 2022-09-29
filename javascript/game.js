if (!localStorage.getItem("gameSettings")) {
    window.location.href = '../index.html';
}

// Fetch
let groups;
fetch("../data/data.json")
    .then((response) => response.json())
    .then((data) => {
        groups = data;
    });

let groupWords;
let randomWord;
let randomGroup;
let globalTries;

const btnGuess = document.getElementById("btnGuess");
const btnStart = document.getElementById("btnStart");
const textCongratulation = document.getElementById("text-congratulation");
const textTries = document.getElementById("text-tries");
const writeAnswer = document.getElementById("write-answer");

const gameSettings = JSON.parse(localStorage.getItem("gameSettings"));

document.getElementById("clue").innerHTML = "¡Bienvenido/a, " + gameSettings.name + "! Haz click en Nuevo Juego para iniciar la partida";

function toggleAction(isNewGame) {
    btnGuess.hidden = !isNewGame;
    btnStart.hidden = isNewGame;
}

function start() {
    // Busco un grupo de palabras aleatorio dentro del objeto
    randomGroup = Math.floor(Math.random() * groups.length);
    groupWords = groups[randomGroup];
    switch (gameSettings.level) {
        case "2":
            globalTries = 0; //avanzado
            break;
        case "1":
            globalTries = 1; //intermedio
            break;
        case "0":
        default:
            globalTries = 2; //principiante
            break;
    }

    // Busco una palabra aleatoria dentro del grupo seleccionado
    randomWord = groupWords.words[Math.floor(Math.random() * groupWords.words.length)];
    textCongratulation.innerHTML = "";
    const letters = groupWords.letters.sort(() => 0.5 - Math.random()).join(" - ");
    document.getElementById("clue").innerHTML =
        "¡Ya comenzó! Es una palabra de " + randomWord.length + " letras y las letras disponibles son: " + letters + ".";
    textTries.innerHTML = "";
    writeAnswer.value = "";
    toggleAction(true);
}

function shakeTries() {
    textTries.classList.add("shake");
    setTimeout(() => {
        textTries.classList.remove("shake");
    }, 300);
}

function guessWord() {
    let guess = writeAnswer.value;
    if (guess == null) {
        return;
    }

    if (randomWord.toLowerCase() === guess.toLowerCase()) {
        textCongratulation.innerHTML = "¡Felicitaciones, " + guess + " es la palabra correcta!";
        document.getElementById("clue").innerHTML = "¡Has ganado!";
        textTries.innerHTML = "";
        toggleAction(false);
    } else {
        if (globalTries == 0) {
            textTries.innerHTML = "¡Te has quedado sin intentos! Solicitá una palabra nueva para continuar jugando";
            shakeTries();
            writeAnswer.value = "";
            toggleAction(false);
        } else {
            let tries = " intentos";
            if (globalTries == 1) {
                tries = " intento";
            }
            textTries.innerHTML = "¡Upss! Parece que no es la palabra correcta. ¡Probá de nuevo! Te quedan " + globalTries + tries;
            shakeTries();
        }
    }

    globalTries = globalTries - 1;
}

// Animación de reloj de arena
function rotate() {
    const sandglassClasses = document.getElementById("sandglass").classList;
    if (sandglassClasses.contains("icon-rotate")) {
        sandglassClasses.remove("icon-rotate");
    } else {
        sandglassClasses.add("icon-rotate");
    }
}

// Event Listeners
btnGuess.addEventListener("click", rotate, true);
document.getElementById("write-answer").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guessWord();
    }
});
