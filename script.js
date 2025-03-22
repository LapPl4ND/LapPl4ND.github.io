document.addEventListener("DOMContentLoaded", function () {
    let video = document.getElementById("bg-video");
    let muteButton = document.getElementById("mute-button");
    let audio = document.getElementById("bg-music");
    let volumeSlider = document.getElementById("volume-slider");

    video.muted = true;
    video.play();
    audio.volume = 1.0;
    audio.muted = true;

    function enableSound() {
        video.muted = false;
        audio.muted = false;
        audio.play();
        muteButton.textContent = "🔊";
        document.removeEventListener("click", enableSound);
    }
    document.addEventListener("click", enableSound);

    muteButton.addEventListener("click", function () {
        if (audio.muted) {
            video.muted = false;
            audio.muted = false;
            audio.play();
            this.textContent = "🔊";
        } else {
            video.muted = true;
            audio.muted = true;
            this.textContent = "🔈";
        }
    });

    // ✅ Changer le volume avec le slider
    volumeSlider.addEventListener("input", function () {
        audio.volume = this.value;
        updateSlider(); // 🔥 Appelle la fonction pour MAJ le remplissage
    });

    // ✅ Fonction pour mettre à jour la barre de progression
    function updateSlider() {
        let value = volumeSlider.value * 100; // Convertit en pourcentage
        volumeSlider.style.setProperty("--progress", value + "%");
    }

    updateSlider(); // 🔥 Initialise au chargement
});
