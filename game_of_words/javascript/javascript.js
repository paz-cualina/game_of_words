const groups = [
    {
        letters: ["E", "O", "S", "T", "C"],
        words: ["eco", "seco", "cesto"]
    },
    {
        letters: ["L", "V", "A", "E", "L"],
        words: ["ave", "leal", "valle"]
    },
    {
        letters: ["E", "T", "R", "N", "F", "E"],
        words: ["ten", "tren", "tener", "frente"]
    }
];

let groupWords;
let randomWord;
let randomGroup;
let globalTries;

const btnGuess = document.getElementById("btnGuess");
const btnStart = document.getElementById("btnStart");
const textCongratulation = document.getElementById("text-congratulation");
const textTries = document.getElementById("text-tries");
const writeAnswer = document.getElementById("write-answer");

document.getElementById("clue").innerHTML = "¡BIENVENIDO! Haz click en nuevo juego para iniciar la partida";

function toggleAction(isNewGame) {
    btnGuess.hidden = !isNewGame;
    btnStart.hidden = isNewGame;
}

function start() {
    // Busco un grupo de palabras aleatorio dentro del objeto
    randomGroup = Math.floor(Math.random() * groups.length);
    groupWords = groups[randomGroup];
    globalTries = 2;

    // Busco una palabra aleatoria dentro del grupo seleccionado
    randomWord = groupWords.words[Math.floor(Math.random() * groupWords.words.length)];
    textCongratulation.innerHTML = "";
    document.getElementById("clue").innerHTML =
        "¡Ya comenzó! Es una palabra de " + randomWord.length + " letras y las letras disponibles son: " + groupWords.letters.join(" - ") + ".";
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
        textCongratulation.innerHTML = "¡Felicitaciones " + guess + " es la palabra correcta!";
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
            textTries.innerHTML = "¡Upss! Parece que no es la palabra correcta. ¡Probá de nuevo! Te quedan " + globalTries + " intentos";
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
