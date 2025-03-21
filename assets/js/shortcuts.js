// Gestion des événements clavier
function handleKeyPress(event) {
    if (event.key === "a" || event.key === "A") {
        window.open("http://corundum.gitbook.io/quick" , '_blank');
    }
    if (event.key === "g" || event.key === "G") {
        window.open("https://github.com/CorundumProject" , '_blank');
    }
    if (event.key === "d" || event.key === "D") {
        window.open("https://discord.gg/2zX67vqh6b" , '_blank');
    }
}

// Activer/Désactiver les événements clavier
function enableKeyListeners() {
    document.addEventListener("keydown", handleKeyPress);
}

function disableKeyListeners() {
    document.removeEventListener("keydown", handleKeyPress);
}

// Écoute des événements de la barre de recherche
searchInput.addEventListener("focus", () => {
    disableKeyListeners();
});

searchInput.addEventListener("blur", () => {
    enableKeyListeners();
});


// Activation initiale des écouteurs de touches
enableKeyListeners();