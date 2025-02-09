// Sélection de l'élément où afficher les applications
const applicationsContainer = document.querySelector(".applications-container");
let selectedApplications = [];
const errorAlert = document.querySelector(".error");
const modal = document.querySelector('#installModal');
const helpButton = document.querySelector(".help");
const outputCommand = document.querySelector(".command");

// Sélectionner les applications à installer
function selectApp(card, appId) {
    const index = selectedApplications.indexOf(appId);

    if (index === -1) {
        // Ajouter l'application si elle n'est pas déjà sélectionnée
        selectedApplications.push(appId);
        card.classList.add("text-bg-primary");
    } else {
        // Retirer l'application si elle est déjà sélectionnée
        selectedApplications.splice(index, 1);
        card.classList.remove("text-bg-primary");
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
        outputCommand.textContent = "brew install --cask " + selectedApplications.join(" ");

        generateInstallCommand();
    }
});

// Fonctionnement du bouton d'aide
helpButton.addEventListener("click", () => {
    window.open('https://corundum.gitbook.io/quick', '_blank');
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
            cardDiv.classList.add("card", "h-100");
            cardDiv.addEventListener("click", () => selectApp(cardDiv, app.id));

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

            const cardText = document.createElement("p");
            cardText.classList.add("card-text", "text-muted", "text-center");
            cardText.textContent = app.description;

            // Assembler les éléments
            imgContainer.appendChild(img);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardDiv.appendChild(imgContainer);
            cardDiv.appendChild(cardBody);
            colDiv.appendChild(cardDiv);
            applicationsContainer.appendChild(colDiv);
        });
    })
    .catch(error => console.error("Erreur :", error));
