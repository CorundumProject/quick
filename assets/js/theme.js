// Vérifier la préférence de thème de l'utilisateur (clair ou sombre)
const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Fonction pour appliquer le thème
function applyTheme() {
    if (themeMediaQuery.matches) {
        document.body.setAttribute('data-bs-theme', 'dark');
    } else {
        document.body.setAttribute('data-bs-theme', 'light');
    }
}

// Appliquer immédiatement le thème en fonction de la préférence de l'utilisateur
applyTheme();

// Ajouter un écouteur d'événement pour détecter les changements de préférence de thème
themeMediaQuery.addEventListener('change', applyTheme);