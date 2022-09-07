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

document.getElementById("clue").innerHTML = "¡BIENVENIDO! Haz click en nuevo juego para iniciar la partida";

function start() {
    // Busco un grupo de palabras aleatorio dentro del objeto
    randomGroup = Math.floor(Math.random() * groups.length);
    groupWords = groups[randomGroup];
    globalTries = 2;

    // Busco una palabra aleatoria dentro del grupo seleccionado
    randomWord = groupWords.words[Math.floor(Math.random() * groupWords.words.length)];
    document.getElementById("clue").innerHTML =
        "¡Ya comenzó! Es una palabra de " + randomWord.length + " letras y las letras disponibles son: " + groupWords.letters.join(" - ") + ".";

    document.getElementById("btnGuess").hidden = false;
    document.getElementById("btnStart").hidden = true;
    document.getElementById("text-congratulation").innerHTML = "";
    document.getElementById("write-answer").value = "";
    document.getElementById("text-tries").innerHTML = "";
}

function guessWord() {
    let guess = document.getElementById("write-answer").value;
    if (guess == null) {
        return;
    }

    if (randomWord.toLowerCase() === guess.toLowerCase()) {
        document.getElementById("text-congratulation").innerHTML = "¡Felicitaciones " + guess + " es la palabra correcta!";
        document.getElementById("clue").innerHTML = "¡Has ganado!";
        document.getElementById("text-tries").innerHTML = "";
        document.getElementById("btnGuess").hidden = true;
        document.getElementById("btnStart").hidden = false;
    } else {
        if (globalTries == 0) {
            document.getElementById("text-tries").innerHTML = "¡Te has quedado sin intentos! Solicitá una palabra nueva para continuar jugando";
            document.getElementById("btnGuess").hidden = true;
            document.getElementById("btnStart").hidden = false;
            document.getElementById("write-answer").value = "";
        } else {
            document.getElementById("text-tries").innerHTML = "¡Upss! Parece que no es la palabra correcta. ¡Probá de nuevo! Te quedan " + globalTries + " intentos";
        }
    }

    globalTries = globalTries - 1;
}

// Animación de reloj de arena
let btnPlay = document.getElementById("btnGuess"),
    imgSandglass = document.getElementById("sandglass"),
    counter = 0;

    function rotate() {
        if (counter == 0) {
            imgSandglass.classList.add("icon-rotate");
            counter = 1;
        }   
        else {
            imgSandglass.classList.remove("icon-rotate");
            counter = 0;
        }
    }

// Enter input
btnGuess.addEventListener("click", rotate, true);
document.getElementById("write-answer").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guessWord();
    }
});
