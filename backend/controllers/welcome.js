// Gestion de la table qui contient la phrase de présentation
// const WelcomePhrase = require('../models/WelcomePhrase')
// const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../data/users');
// List of tokens
let tokens = [];


exports.login = (req, res) => {
    try {
        const { username, password } = req.body; // Extraire le nom d'utilisateur et le mot de passe de la demande

        const user = users.find(user => user.username === username);

        if (!user) { 
            return res.status(401).json({ message: "User or password incorrect" });
        }

        // Decrypt token 
        bcrypt.compare(req.body.password, user.password).then(async valid => {
            if (!valid) {     // User existe mais mauvais password
                res.status(401).json({ message: 'User or password incorrect' })
            } else {

                // Create token for futur request
                const token = jwt.sign(
                    { token: req.body.rfid },
                    'A$rSor3pTti3!CP5@CXBLXfaG$asMYxC6AHY?e6!',
                    { expiresIn: '1h' }
                )
                tokens.push(token)
                res.status(200).json({ token: token })
            }
        })
    } catch (error) {
        res.status(501).json({ error })
    }
}