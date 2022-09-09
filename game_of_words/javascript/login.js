//Local Storage
function saveToLocalStorage () {
    const name = document.getElementById("btnName").value;
    const level = document.getElementById("btnLevel").value;

    const gameSettings = {
        name: name,
        level: level
    };
    
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
}