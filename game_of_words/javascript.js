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

// Busco un grupo de palabras aleatorio dentro del objeto
const randomGroup = Math.floor(Math.random() * groups.length);
const groupWords = groups[randomGroup];

// Busco una palabra aleatoria dentro del grupo seleccionado
let randomWord = groupWords.words[Math.floor(Math.random() * groupWords.words.length)];
document.getElementById("clue").innerHTML =
    "¡Ya comenzó! Es una palabra de " + randomWord.length + " letras y las letras disponibles son: " + groupWords.letters.join(" - ") + ".";

function guessWord(tries) {
    let guess = prompt("Escribe la palabra");
    if (guess == null) {
        return true; 
    }

    if (randomWord.toLowerCase() === guess.toLowerCase()) {
        alert("¡Felicitaciones " + guess + " es la palabra correcta!");
        document.getElementById("clue").innerHTML = "¡Has ganado!";

        return true;
    } else {
        if (tries == 0) {
            alert("¡Te has quedado sin intentos! Solicitá una palabra nueva para continuar jugando");
        } else {
            alert ("¡Upss! Parece que no es la palabra correcta. ¡Probá de nuevo! Te quedan " + tries + " intentos");
        }

        return false;
    }
}

function play() {
    for (let i = 2; i >= 0; i--) {
        let success = guessWord(i);
        if (success) {
            break;
        }
    }
}


// Animación de reloj de arena
let btnPlay = document.getElementById("btnGuess"),
    imgSandglass = document.getElementById("sandglass"),
    counter = 0;

    function rotate() {
        if (counter == 0) {
            sandglass.classList.add("icon-rotate");
            counter = 1;
        }   
        else {
            sandglass.classList.remove("icon-rotate");
            counter = 0;
        }
    }

    btnGuess.addEventListener("click", rotate, true)
