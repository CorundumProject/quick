// Sélection de l'élément où afficher les applications
const applicationsContainer = document.querySelector("#applications-container");
const selectedApplicationContainer = document.querySelector("#application-detail");
let selectedApplications = [];
const errorAlert = document.querySelector(".error");
const modal = document.querySelector('#installModal');
const helpButton = document.querySelector(".help");
const outputCommand = document.querySelector(".command");
const status = document.querySelector(".status");
const searchBox = document.querySelector("#search");
const searchInput = document.querySelector("#search-input");
let isDisplayed = false;

// Sélectionner les applications à installer
function selectApp(card, appId) {
    const index = selectedApplications.indexOf(appId);

    if (index === -1) {
        // Ajouter l'application si elle n'est pas déjà sélectionnée
        selectedApplications.push(appId);
        card.classList.add("border-primary");
    } else {
        // Retirer l'application si elle est déjà sélectionnée
        selectedApplications.splice(index, 1);
        card.classList.remove("border-primary");
    }
}

// Afficher les détails d'une application
function appDetails(appId) {
    fetch("https://corundumproject.github.io/quick/assets/json/applications.json")
        .then(response => response.json())
        .then(data => {
            const app = data.find(app => app.id === appId);
            if (app) {
                selectedApplicationContainer.innerHTML = `
                    <div class="card">
                        <div class="card-body text-center">
                            <img src="${app.icon}" alt="${app.name}" class="w-25 mb-3 text-center">
                            <h5 class="card-title text-center">${app.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted text-center">${app.category}</h6>
                            <p class="card-text text-center">${app.description}</p>
                            <a href="${app.website}" target="_blank" class="btn btn-primary">Site officiel</a>
                            <button id="back-button" class="btn btn-secondary">Revenir en arrière</button>
                        </div>
                    </div>
                `;
                applicationsContainer.classList.add("d-none");
                searchBox.classList.add("d-none");
                document.querySelector("#back-button").addEventListener("click", hideDetails);
            }
        })
        .catch(error => console.error("Erreur :", error));
}

function hideDetails() {
    selectedApplicationContainer.innerHTML = ``;
    applicationsContainer.classList.remove("d-none");
    searchBox.classList.remove("d-none");
}

// Générer la ligne de commande brew qui va permettre d'installer les applications
function generateInstallCommand() {
    if (selectedApplications.length === 0) {
        errorAlert.style.display = "block";
        errorAlert.style.animation = "displayError 5s ease-in-out";
        setTimeout(() => {
            errorAlert.style.display = "none";
        }, 5000);
    } else {
        // Afficher le modal avec Bootstrap
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }
}

// Fonctionnement du bouton d'aide
helpButton.addEventListener("click", () => {
    window.open('https://corundum.gitbook.io/quick', '_blank');
});

// Copier la commande dans le presse-papier quand l'utilisateur clique dessus
outputCommand.addEventListener("click", () => {
    const commandText = outputCommand.textContent;

    // Utiliser l'API Clipboard pour copier
    navigator.clipboard.writeText(commandText).then(() => {
        status.classList.add("text-success");
        status.textContent = "Texte copié !";

        setTimeout(() => {
            status.classList.remove("text-success");
            status.textContent = "";
        }, 2500);
    }).catch((err) => {
        status.classList.add("text-danger");
        status.textContent = "Une erreur est survenue : " + err;
        setTimeout(() => {
            status.classList.remove("text-danger");
            status.textContent = "";
        }, 2500);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Chargement du fichier JSON avec fetch()
    const applicationsContainer = document.getElementById("applications-container");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    function fetchAndDisplayApps(searchTerm = "") {
        fetch("https://corundumproject.github.io/quick/assets/json/applications.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement du fichier JSON");
                }
                return response.json();
            })
            .then(data => {
                applicationsContainer.innerHTML = ""; // Effacer les résultats précédents
                data.filter(app => {
                    const lowerSearch = searchTerm.toLowerCase();
                    return (
                        app.name.toLowerCase().includes(lowerSearch) ||
                        app.category.toLowerCase().includes(lowerSearch) ||
                        app.developer.toLowerCase().includes(lowerSearch)
                    );
                }).forEach(app => {
                    const colDiv = document.createElement("div");
                    colDiv.classList.add("col-md-4", "mb-3");

                    const cardDiv = document.createElement("div");
                    cardDiv.classList.add("card", "h-100", "border-3");
                    cardDiv.addEventListener("click", () => selectApp(cardDiv, app.id));

                    if (selectedApplications.includes(app.id)) {
                        cardDiv.classList.add("border-primary");
                    }

                    const imgContainer = document.createElement("div");
                    imgContainer.classList.add("w-100", "d-flex", "justify-content-center", "align-items-center", "mt-4");

                    const img = document.createElement("img");
                    img.src = app.icon;
                    img.classList.add("w-25");
                    img.alt = app.name;

                    const cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");

                    const cardTitle = document.createElement("h5");
                    cardTitle.classList.add("card-title", "text-center");
                    cardTitle.textContent = app.name;

                    const cardLink = document.createElement("button");
                    cardLink.classList.add("btn", "btn-primary", "mt-2", "mb-2", "w-100");
                    cardLink.textContent = "Détails";
                    cardLink.addEventListener("click", (event) => {
                        event.stopPropagation(); // Empêcher la propagation de l'événement
                        appDetails(app.id);
                    });

                    imgContainer.appendChild(img);
                    cardBody.appendChild(cardTitle);
                    cardDiv.appendChild(imgContainer);
                    cardDiv.appendChild(cardBody);
                    cardBody.appendChild(cardLink);
                    colDiv.appendChild(cardDiv);
                    applicationsContainer.appendChild(colDiv);
                });
            })
            .catch(error => console.error("Erreur :", error));
    }

    searchButton.addEventListener("click", () => {
        fetchAndDisplayApps(searchInput.value);
    });

    searchInput.addEventListener("input", () => {
        fetchAndDisplayApps(searchInput.value);
    });

    fetchAndDisplayApps();
});

// Gestion des événements clavier
function handleKeyPress(event) {
    if (event.key === "i" || event.key === "I") {
        // Générer et afficher la commande
        const command = "brew install --cask " + selectedApplications.join(" ");
        outputCommand.textContent = command;
        generateInstallCommand();
    }
    if (event.key === "a" || event.key === "A") {
        window.open("http://corundum.gitbook.io/quick" , '_blank');
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