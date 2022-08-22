//const groupWords = [["eco", "seco", "cesto"], ["ave", "leal", "valle"]];
const groupWords = ["eco", "seco", "cesto"];

function guessWord(word, tries) {
    let guess = prompt("¿Cuál es la palabra? Es una palabra de " + word.length + " letras y las letras disponibles son: E O S T C.");
    if (guess == null) {
        return true; //para poder cancelar
    }

    if (word === guess) {
        alert ("¡Felicitaciones " + guess + " es la palabra correcta!");

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
    const randomWord = groupWords[Math.floor(Math.random() * groupWords.length)];
    for (let i = 2; i >= 0; i--) {
        let success = guessWord(randomWord, i);
        if (success) {
            break;
        }
    }
}

play();
