document.addEventListener("DOMContentLoaded", function () {
    let video = document.getElementById("bg-video");
    let muteButton = document.getElementById("mute-button");

    muteButton.addEventListener("click", function () {
        if (video.muted) {
            video.muted = false;
            video.volume = 1.0; // S'assurer que le volume est au max
            this.textContent = "🔊";
        } else {
            video.muted = true;
            this.textContent = "🔈";
        }
    });

   //reload mp4
    video.addEventListener("ended", function () {
        this.currentTime = 0; // Remet la vidéo au début
        this.play(); // Redémarre la lecture
    });
});
