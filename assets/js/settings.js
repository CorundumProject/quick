// Définition des variables
const closeButton = document.querySelector("#close-settings");
const changeAlert = document.querySelector("#change-alert");
const switchBeta = document.querySelector("#apps-beta");
const applicationType = localStorage.getItem("application-type");

// Fonction qui initialise la page des paramètres
function initialize() {
    if (localStorage.getItem("application-type") === "default") {
        document.querySelector("label[for=apps-beta]").textContent = "Désactivé";
        switchBeta.checked = false;
    } else {
        document.querySelector("label[for=apps-beta]").textContent = "Activé";
        switchBeta.checked = true;
    }
}

// Fonction qui affiche puis cache un message indiquant la sauvegarde des paramètres
function displaySaveMessage() {
    changeAlert.classList.remove("d-none");
    setTimeout(() => {
        changeAlert.classList.add("d-none");
    }, 5000); // Temps d'affichage de 5 secondes
}

// Fonction qui active la sélection des pré-versions d'applications
function displayPrereleaseApps() {
    if (document.querySelector("label[for=apps-beta]").textContent === "Activé") {
        localStorage.setItem("application-type", "default");
        document.querySelector("label[for=apps-beta]").textContent = "Désactivé";
    } else {
        localStorage.setItem("application-type", "pre-release");
        document.querySelector("label[for=apps-beta]").textContent = "Activé";
    }
}

// Fonction qui permet de modifier l'affichage des applications
function changeApplicationDisposition() {
    const dispositionSelect = document.getElementById("apps-disposition");

    if (dispositionSelect) {
        const savedDisposition = localStorage.getItem("application-disposition");
        if (savedDisposition) {
            dispositionSelect.value = savedDisposition;
        }

        dispositionSelect.addEventListener("change", function (e) {
            const value = e.target.value;
            console.log("Disposition choisie :", value);

            localStorage.setItem("application-disposition", value);

            const appContainer = document.getElementById("applications-container");
            if (appContainer) {
                appContainer.classList.remove("cards-layout", "list-layout");
                appContainer.classList.add(value === "list" ? "list-layout" : "cards-layout");
            }
        });
    }
}

function accessToHomepage() {
    if (!localStorage.getItem("alert-dismissed")) {
        document.querySelector("#welcome-alert").classList.remove("d-none");
    }
    document.querySelector("#settings").classList.add("d-none");
    document.querySelector("#applications-container").classList.remove("d-none");
    document.querySelector("#application-detail").classList.remove("d-none");
    document.querySelector("#search").classList.remove("d-none");
}

// Ajouts des écouteurs d'événements et appel de la fonction d'initialisation
initialize();
closeButton.addEventListener("click", accessToHomepage);
switchBeta.addEventListener("click", displayPrereleaseApps);
changeApplicationDisposition();