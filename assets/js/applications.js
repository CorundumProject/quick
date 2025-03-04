// Sélection de l'élément où afficher les applications
const applicationsContainer = document.querySelector(".applications-container");
let selectedApplications = [];
const errorAlert = document.querySelector(".error");
const modal = document.querySelector('#installModal');
const helpButton = document.querySelector(".help");
const outputCommand = document.querySelector(".command");
const status = document.querySelector(".status");
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

// Détecter la touche "i" pour ouvrir le modal
document.addEventListener("keydown", (event) => {
    if (event.key === "i" || event.key === "I") {
        // Générer et afficher la commande
        const command = "brew install --cask " + selectedApplications.join(" ");
        outputCommand.textContent = command;

        generateInstallCommand();
    }
});

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

// Chargement du fichier JSON avec fetch()
fetch("https://corundumproject.github.io/quick/assets/json/applications.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors du chargement du fichier JSON");
        }
        return response.json();
    })
    .then(data => {
        // Effacer le contenu existant avant d'ajouter les nouvelles cartes
        applicationsContainer.innerHTML = "";

        // Boucle sur les données JSON pour générer les cartes dynamiquement
        data.forEach(app => {
            // Créer les éléments
            const colDiv = document.createElement("div");
            colDiv.classList.add("col");

            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card", "h-100", "border-3");
            cardDiv.addEventListener("mousedown", () => selectApp(cardDiv, app.id));

            const imgContainer = document.createElement("div");
            imgContainer.classList.add("w-100", "d-flex", "justify-content-center", "align-items-center", "mt-4", "pe-auto");

            const img = document.createElement("img");
            img.src = app.icon;
            img.classList.add("w-25");
            img.alt = app.name;

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title", "text-center");
            cardTitle.textContent = app.name;

            const cardSubtitle = document.createElement("h6");
            cardSubtitle.classList.add("card-subtitle", "text-center", "text-muted", "mt-2", "mb-2");
            cardSubtitle.textContent = app.category;

            const cardText = document.createElement("p");
            cardText.classList.add("card-text", "text-center", "text-muted");
            cardText.textContent = app.description;

            const cardInformation = document.createElement("a");
            cardInformation.classList.add("card-link");
            cardInformation.innerHTML = "<i class='bi bi-info-circle-fill'></i>";

            // Assembler les éléments
            imgContainer.appendChild(img);
            cardBody.appendChild(cardTitle);
            // cardBody.appendChild(cardSubtitle);
            // cardBody.appendChild(cardText);
            // cardBody.appendChild(cardInformation);
            cardDiv.appendChild(imgContainer);
            cardDiv.appendChild(cardBody);
            colDiv.appendChild(cardDiv);
            applicationsContainer.appendChild(colDiv);
        });
    })
    .catch(error => console.error("Erreur :", error));
