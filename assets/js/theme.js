// Vérifier la préférence de thème de l'utilisateur (clair ou sombre)
const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const themeSettings = localStorage.getItem("theme");

// Fonction pour appliquer le thème
function applyTheme() {
    if (themeSettings === "default") {
        if (themeMediaQuery.matches) {
            document.body.setAttribute('data-bs-theme', 'dark');
        } else {
            document.body.setAttribute('data-bs-theme', 'light');
        }
    } else if (themeSettings === "light") {
        document.body.setAttribute('data-bs-theme', 'light');
    } else if (themeSettings === "dark") {
        document.body.setAttribute('data-bs-theme', 'dark');
    }
}

// Appliquer immédiatement le thème en fonction de la préférence de l'utilisateur
applyTheme();

// Ajouter un écouteur d'événement pour détecter les changements de préférence de thème
themeMediaQuery.addEventListener('change', applyTheme);