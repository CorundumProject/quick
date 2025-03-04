document.addEventListener("DOMContentLoaded", function () {
    const alertBox = document.getElementById("welcome-alert");
    const closeButton = document.querySelector("#welcome-alert .btn-close");

    // Vérifie si l'alerte doit être cachée
    if (localStorage.getItem("alertDismissed") === "true") {
        alertBox.classList.add("d-none");
    }

    // Vérifie que le bouton existe avant d'ajouter l'écouteur
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            localStorage.setItem("alertDismissed", "true");
        });

        // Écoute l'événement Bootstrap qui signale que l'alerte a été fermée
        alertBox.addEventListener("closed.bs.alert", function () {
            alertBox.classList.add("d-none");
        });
    }
});