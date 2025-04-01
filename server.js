const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ]
});

// On récupère le token via une variable d'environnement (qu'on configurera sur Vercel)
const token = process.env.DISCORD_TOKEN;
const YOUR_USER_ID = '959388461306097664';

let presenceData = {
    username: "Lappland",
    status: "Hors ligne",
    activity: "Aucune activité détectée",
    avatar: ""
};

client.on('ready', () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (!newPresence || !newPresence.user || newPresence.user.id !== YOUR_USER_ID) return;

    const user = newPresence.user;
    const activities = newPresence.activities || [];
    let detectedActivity = "Aucune activité détectée";

    activities.forEach(activity => {
        if (activity.type === 0) detectedActivity = `Joue à ${activity.name}`;
        if (activity.type === 1) detectedActivity = `Stream ${activity.name}`;
        if (activity.type === 2) detectedActivity = `Écoute ${activity.name}`;
        if (activity.type === 3) detectedActivity = `Regarde ${activity.name}`;
        if (activity.type === 4) detectedActivity = `Statut personnalisé - ${activity.state || 'Sans détail'}`;
    });

    const avatarURL = user.displayAvatarURL({ format: 'gif', dynamic: true, size: 512 });

    presenceData = {
        username: user.username || "Lappland",
        status: newPresence.status || "Hors ligne",
        activity: detectedActivity,
        avatar: avatarURL
    };

    console.log(presenceData);
});

client.login(token).catch(console.error);

app.get('/data', (req, res) => {
    res.json(presenceData);
});

// On exporte l'application pour Vercel
module.exports = app;