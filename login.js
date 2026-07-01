document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");

    // Fonction pour hacher le mot de passe avec SHA-256
    const hashPassword = (password) => {
        //return CryptoJS.SHA256(password).toString();
        return password;
    };

    loginBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Hachage de ton mot de passe d'origine
        const correctHashedPassword = "123"; 

        // On hache ce que l'utilisateur a entré
        const hashedPassword = hashPassword(password);

        if (username === "Lappland" && hashedPassword === correctHashedPassword) {
            console.log("Connexion réussie !");
            window.location.href = "page4.html"; 
        } else {
            console.log("Connexion échouée.");
            document.getElementById("error-message").textContent = "Nom d'utilisateur ou mot de passe incorrect.";
        }
    });
});
