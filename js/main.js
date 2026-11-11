// =========================================
// LapPl4ND — script principal
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // ----- Année dans le footer -----
    document.getElementById("year").textContent = new Date().getFullYear();

    // ----- Musique -----
    // Les navigateurs bloquent le son automatique : la musique démarre
    // quand le visiteur clique sur le bouton.
    const audio = document.getElementById("bg-music");
    const sound = document.getElementById("sound");
    const soundBtn = document.getElementById("sound-btn");
    const volume = document.getElementById("volume");

    let savedVolume = 0.5;
    try {
        const v = localStorage.getItem("volume");
        if (v !== null) savedVolume = parseFloat(v);
    } catch (e) { /* stockage indisponible : on garde 0.5 */ }

    // Remplit la barre en rose jusqu'au niveau du volume
    const paintVolume = () => volume.style.setProperty("--progress", (volume.value * 100) + "%");

    audio.volume = savedVolume;
    volume.value = savedVolume;
    paintVolume();

    soundBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().then(() => {
                sound.classList.add("playing");
                soundBtn.setAttribute("aria-label", "Couper la musique");
            }).catch(err => console.log("Lecture impossible :", err));
        } else {
            audio.pause();
            sound.classList.remove("playing");
            soundBtn.setAttribute("aria-label", "Activer la musique");
        }
    });

    volume.addEventListener("input", () => {
        audio.volume = volume.value;
        paintVolume();
        try { localStorage.setItem("volume", volume.value); } catch (e) { }
    });

    // ----- Apparition des blocs au scroll -----
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    // ----- Lien actif dans le menu selon la section visible -----
    const links = document.querySelectorAll(".nav-links a");
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(a => {
                    a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
                });
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll("main section").forEach(s => sectionObserver.observe(s));
});
