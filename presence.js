document.addEventListener("DOMContentLoaded", function () {
    async function fetchPresence() {
        try {
            const response = await fetch('/data');
            const data = await response.json();

            console.log(data); // Voir les données reçues

            const profilePic = document.getElementById('profile-pic');
            profilePic.src = data.avatar;

            document.getElementById('discord-presence').innerHTML = `
                <div style="color: #ff99cc; padding: 0; border-radius: 10px;">
                    <p><strong>Pseudo :</strong> ${data.username || '...'}</p>
                    <p><strong>Activite :</strong> ${data.activity || '...'}</p>
                </div>
            `;

            // Mise à jour de l'indicateur de statut
            const statusIndicator = document.getElementById('status-indicator');
            if (data.status === "online") {
                statusIndicator.style.backgroundColor = "green";
            } else if (data.status === "idle") {
                statusIndicator.style.backgroundColor = "orange";
            } else if (data.status === "dnd") {
                statusIndicator.style.backgroundColor = "red";
            } else {
                statusIndicator.style.backgroundColor = "gray"; // Offline ou inconnu
            }

        } catch (error) {
            console.error('Erreur lors de la récupération de la présence Discord :', error);
            document.getElementById('discord-presence').textContent = "Erreur de connexion au serveur";
        }
    }

    fetchPresence();
    setInterval(fetchPresence, 5000);
});
