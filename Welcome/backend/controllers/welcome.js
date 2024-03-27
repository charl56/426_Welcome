// Gestion de la table qui contient la phrase de présentation
// const WelcomePhrase = require('../models/WelcomePhrase')
// const auth = require('../middleware/auth');


exports.editPhrase = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  // Récupération du token
        const role = await auth(token);                     // Décodage du role dans le token
        if (role == 'Admin') {                              // En fonction du rôle : edit faq ou non       
            await WelcomePhrase.update(req.body, {where: { id:req.params.id }})
                .then(() => res.status(200).json({ message: 'Objet modifié'}))
                .catch(error => res.status(404).json({ error }));
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.getAllPhrases = (req, res, next) => {
    res.status(200).json("Content")
}