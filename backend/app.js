const express = require('express')

// Routes utiles au fonctionnement complet de l'app
const Welcome = require('./routes/welcome')

// Utilisation d'express
const app = express();

// Définir le dossier pour les fichiers statiques
app.use(express.static('public'));

// Permet d'être interroger par le front, authorise CORS policy
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Permet pour la suite d'avoir accès au corps d'une requête Json (req.body)
app.use(express.json());


// Chemin pour afficher et modifier la phrase de présentation
app.use('/api', Welcome)

module.exports = app;