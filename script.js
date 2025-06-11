document.addEventListener("DOMContentLoaded", function () {
    let video = document.getElementById("bg-video");
    let muteButton = document.getElementById("mute-button");
    let audio = document.getElementById("bg-music");
    let volumeSlider = document.getElementById("volume-slider");

    // Initialize with muted video and audio
    video.muted = true;
    video.play().catch(e => console.log("Video play failed:", e));

    // Set initial volume but keep muted
    audio.volume = volumeSlider.value;
    audio.muted = true;
    muteButton.textContent = "🔈​"; // Show muted state

    let autoplayAttempt = audio.play().catch(error => {
        console.log("Autoplay blocked:", error);
    });

    function enableSound() {
        audio.muted = false;
        video.muted = false;
        // Try to play again when unmuting
        audio.play().catch(e => console.log("Play failed:", e));
        muteButton.textContent = "🔊​";
        document.removeEventListener("click", enableSound);
        document.removeEventListener("keydown", enableSound);
    }

    document.addEventListener("click", enableSound);
    document.addEventListener("keydown", enableSound);

    muteButton.addEventListener("click", function () {
        if (audio.muted) {
            video.muted = false;
            audio.muted = false;
            audio.play().catch(e => console.log("Play failed:", e));
            this.textContent = "🔊​";
        } else {
            video.muted = true;
            audio.muted = true;
            this.textContent = "🔈​";
        }
    });

    volumeSlider.addEventListener("input", function () {
        audio.volume = this.value;
        updateSlider();
    });

    function updateSlider() {
        let value = volumeSlider.value * 100;
        volumeSlider.style.setProperty("--progress", value + "%");
    }

    updateSlider();

    fetchPresence();
    setInterval(fetchPresence, 5000);


});
