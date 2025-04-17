// Fonction qui affiche la section des paramètres
function displaySettings(state) {
    if (state === true) {
        document.querySelector("#settings").classList.remove("d-none");
        document.querySelector("#applications-container").classList.add("d-none");
        document.querySelector("#application-detail").classList.add("d-none");
        document.querySelector("#search").classList.add("d-none");
        document.querySelector("#welcome-alert").classList.add("d-none");
    }
}

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
    if (event.key === "p" || event.key === "P") {
        displaySettings(true);
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