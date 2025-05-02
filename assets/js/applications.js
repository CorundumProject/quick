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
    fetch("https://corundum.fr/quick/assets/json/applications.json")
        .then(response => response.json())
        .then(data => {
            const app = data.find(app => app.id === appId);
            if (app) {
                selectedApplicationContainer.innerHTML = `
                    <div class="card d-flex flex-row justify-content-between align-items-center">
                        <img src="${app.icon}" alt="${app.name}" class="w-25 mb-3 text-center">
                        <div class="card-body d-flex flex-column align-items-center justify-content-start">
                            <h5 class="w-100 card-title text-left">${app.name}</h5>
                            <h6 class="w-100 card-subtitle text-left mb-2 text-muted">${app.category}</h6>
                            <p class="w-100 card-text text-left">${app.description}</p>
                            <h6 class="w-100 text-left">Assistant compatibilité</h6>
                            <ul class="w-100 text-left">
                                <li class="card-text">Vous devez être sur macOS ${app.version}</li>
                                <li class="card-text">Vous devez avoir un processeur ${app.architecture}</li>
                            </ul>
                            <div class="btn-group w-100" role="group" aria-label="Interaction avec l'application">
                                <a href="${app.website}" target="_blank" class="btn btn-primary">Site officiel</a>
                                <button id="back-button" class="btn btn-secondary">Revenir en arrière</button>
                            </div>
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
        status.classList.remove("d-none");
        setTimeout(() => {
            status.classList.add("d-none");
        }, 2500);
    }).catch((err) => {
        status.classList.remove("d-none");
        status.classList.remove("alert-success");
        status.classList.add("alert-danger");
        status.textContent = "Une erreur est survenue : " + err;
        setTimeout(() => {
            status.classList.remove("alert-danger");
            status.classList.add("alert-success");
            status.textContent = "La commande a été copiée dans le presse-papier avec succès !";
            status.classList.add("d-none");
        }, 2500);
    });
});

function renderApplication(app) {
    const disposition = localStorage.getItem("application-disposition") || "cards";

    if (disposition === "list") {
        const col = document.createElement("div");
        col.classList.add("col-12", "w-100");

        // Conteneur principal
        const wrapperDiv = document.createElement("div");
        wrapperDiv.classList.add("list", "w-100", "d-flex", "align-items-center", "justify-content-between", "border", "rounded", "p-2");

        if (localStorage.getItem("application-type") === "default") {
            wrapperDiv.addEventListener("click", () => selectApp(wrapperDiv, app.id));
        } else if (localStorage.getItem("application-type") === "pre-release") {
            wrapperDiv.addEventListener("click", () => selectApp(wrapperDiv, app.beta));
        }

        // Conteneur pour l'image et le nom
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("d-flex", "align-items-center");

        // Image de l'application
        const appIcon = document.createElement("img");
        appIcon.src = app.icon;
        appIcon.alt = `Icône ${app.name}`;
        appIcon.classList.add("rounded", "me-2");
        appIcon.style.width = "64px";
        appIcon.style.height = "64px";

        const appName = document.createElement("span");
        appName.classList.add("fw-medium");
        appName.textContent = app.name;

        const infoButton = document.createElement("i");
        infoButton.classList.add("bi", "bi-info-circle", "fs-5", "text-secondary");
        infoButton.setAttribute("role", "button");
        infoButton.addEventListener("click", () => appDetails(app.id)); // Ajout de la fonction de détails

        infoDiv.appendChild(appIcon);
        infoDiv.appendChild(appName);
        wrapperDiv.appendChild(infoDiv);
        wrapperDiv.appendChild(infoButton);
        col.appendChild(wrapperDiv);

        return col; // Retourne l'élément pour ajout
    } else {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-md-4", "mb-3");

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "h-100", "border-3");
        if (localStorage.getItem("application-type") === "default") {
            cardDiv.addEventListener("click", () => selectApp(cardDiv, app.id));
        } else if (localStorage.getItem("application-type") === "pre-release") {
            cardDiv.addEventListener("click", () => selectApp(cardDiv, app.beta));
        }

        if (selectedApplications.includes(app.id) || selectedApplications.includes(app.beta)) {
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
            if (app.id) {
                appDetails(app.id);
            } else if (app.beta) {
                appDetails(app.beta);
            }
        });

        imgContainer.appendChild(img);
        cardBody.appendChild(cardTitle);
        cardDiv.appendChild(imgContainer);
        cardDiv.appendChild(cardBody);
        cardBody.appendChild(cardLink);
        colDiv.appendChild(cardDiv);
        return colDiv; // Retourne l'élément pour ajout
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Chargement du fichier JSON avec fetch()
    const applicationsContainer = document.querySelector("#applications-container");
    const searchInput = document.querySelector("#search-input");
    const searchButton = document.querySelector("#search-button");

    function fetchAndDisplayApps(searchTerm = "") {
        fetch("https://corundum.fr/quick/assets/json/applications.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement du fichier JSON");
                }
                return response.json();
            })
            .then(data => {
                applicationsContainer.innerHTML = "";
                const fragment = document.createDocumentFragment();

                const lowerSearch = searchTerm.toLowerCase();

                // Filtrage
                let filteredData = data.filter(app =>
                    app.name.toLowerCase().includes(lowerSearch) ||
                    app.category.toLowerCase().includes(lowerSearch) ||
                    app.developer.toLowerCase().includes(lowerSearch)
                );

                // Tri
                const sort = localStorage.getItem("application-sort");
                if (sort === "a-z") {
                    filteredData.sort((a, b) => a.name.localeCompare(b.name));
                } else if (sort === "z-a") {
                    filteredData.sort((a, b) => b.name.localeCompare(a.name));
                } else if (sort === "category") {
                    filteredData.sort((a, b) => a.category.localeCompare(b.category));
                } else if (sort === "developer") {
                    filteredData.sort((a, b) => a.developer.localeCompare(b.developer));
                }

                // Génération des cartes
                filteredData.forEach(app => {
                    const card = renderApplication(app);
                    fragment.appendChild(card);
                });

                applicationsContainer.appendChild(fragment);
            })
            .catch(error => {
                selectedApplicationContainer.innerHTML = `<p class="alert alert-danger">Impossible de charger les applications. Veuillez réessayer plus tard. Si le problème persiste, veuillez ouvrir une issue sur <a href="https://github.com/corundumproject/quick/issues/" target="_blank" class="alert-link">GitHub</a>.</p>`;
                console.error("Erreur :", error);
                searchInput.disabled = true;
            });
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
    // Ignorer les événements clavier si la barre de recherche est utilisée
    if (searchInput === document.activeElement) return;
    if (event.key === "i" || event.key === "I") {
        // Générer et afficher la commande
        const command = "brew install --cask " + selectedApplications.join(" ");
        outputCommand.textContent = command;
        generateInstallCommand();
    }
}

// Activer/Désactiver les événements clavier
document.addEventListener("keydown", handleKeyPress);