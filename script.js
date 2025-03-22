document.addEventListener("DOMContentLoaded", function () {
    let video = document.getElementById("bg-video");
    let muteButton = document.getElementById("mute-button");

    // ✅ Lancer la vidéo en sourdine immédiatement
    video.muted = true;
    video.play();

    // ✅ Dès qu'on interagit avec la page, on active le son
    function enableSound() {
        video.muted = false;
        video.volume = 1.0;
        muteButton.textContent = "🔊";
        document.removeEventListener("click", enableSound);
    }
    document.addEventListener("click", enableSound);

    // ✅ Gérer le mute/unmute avec le bouton
    muteButton.addEventListener("click", function () {
        if (video.muted) {
            video.muted = false;
            video.volume = 1.0;
            this.textContent = "🔊";
        } else {
            video.muted = true;
            this.textContent = "🔈";
        }
    });
});
