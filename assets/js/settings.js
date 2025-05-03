// Définition des variables
const closeButton = document.querySelector("#close-settings");
const changeAlert = document.querySelector("#change-alert");
const switchBeta = document.querySelector("#apps-beta");
const applicationType = localStorage.getItem("application-type");
const cardSizeSettings = document.querySelector("#card-size-settings");

// Fonction qui initialise la page des paramètres
function initialize() {
    if (localStorage.getItem("application-type") === "default") {
        document.querySelector("label[for=apps-beta]").textContent = "Désactivé";
        switchBeta.checked = false;
    } else {
        document.querySelector("label[for=apps-beta]").textContent = "Activé";
        switchBeta.checked = true;
    }

    if (localStorage.getItem("application-disposition") === "cards") {
        cardSizeSettings.classList.remove("d-none");
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
    const dispositionSelect = document.querySelector("#apps-disposition");

    if (dispositionSelect) {
        const savedDisposition = localStorage.getItem("application-disposition");
        if (savedDisposition) {
            dispositionSelect.value = savedDisposition;
        }

        dispositionSelect.addEventListener("change", function (e) {
            const value = e.target.value;

            localStorage.setItem("application-disposition", value);

            if (value === "cards") {
                cardSizeSettings.classList.remove("d-none");
            } else {
                cardSizeSettings.classList.add("d-none");
            }
        });
    }
}

function changeApplicationSort() {
    const sortSelect = document.querySelector("#apps-sort");

    if (sortSelect) {
        const savedSort = localStorage.getItem("application-sort");
        if (savedSort) {
            sortSelect.value = savedSort;
        }

        sortSelect.addEventListener("change", function (e) {
            const value = e.target.value;

            localStorage.setItem("application-sort", value);
        });
    }
}

function changeCardsSize() {
    const cardSizeSelect = document.querySelector("#card-size-select");

    if (cardSizeSelect) {
        const savedSort = localStorage.getItem("cards-size");
        if (savedSort) {
            cardSizeSelect.value = savedSort;
        }

        cardSizeSelect.addEventListener("change", function (e) {
            const value = e.target.value;

            localStorage.setItem("cards-size", value);
        });
    }
}


function changeTheme() {
    const themeSelect = document.querySelector("#theme-select");

    if (themeSelect) {
        const savedSort = localStorage.getItem("theme");
        if (savedSort) {
            themeSelect.value = savedSort;
        }

        themeSelect.addEventListener("change", function (e) {
            const value = e.target.value;

            localStorage.setItem("theme", value);
        });
    }
}

function displayButton() {
    const installButtonSelect = document.querySelector("#install-button-select");

    if (installButtonSelect) {
        const savedSort = localStorage.getItem("install-button");
        if (savedSort) {
            installButtonSelect.value = savedSort;
        }

        installButtonSelect.addEventListener("change", function (e) {
            const value = e.target.value;

            localStorage.setItem("install-button", value);
        });
    }
}

function accessToHomepage() {
    window.location.reload();
}

// Ajouts des écouteurs d'événements et appel de la fonction d'initialisation
initialize();
closeButton.addEventListener("click", accessToHomepage);
switchBeta.addEventListener("click", displayPrereleaseApps);
changeApplicationDisposition();
changeApplicationSort();
changeTheme();
changeCardsSize();
displayButton();