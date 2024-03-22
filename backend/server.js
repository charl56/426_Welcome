const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const secretKey = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10]);
const plaintext = 'studi0426';
const users = {
    'identifiant1': 'chaîneAléatoire1',
    'identifiant2': 'chaîneAléatoire2',
    // Ajoutez d'autres identifiants et chaînes aléatoires ici
};

app.post('/api/authenticate', (req, res) => {
    const { encryptedData, serialNumber } = req.body;

    const decipher = crypto.createDecipheriv('aes-128-ecb', secretKey, '');
    let decrypted = decipher.update(Buffer.from(encryptedData));
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    const decryptedText = decrypted.toString().trim();

    if (decryptedText === plaintext) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});


app.post('/authenticate', (req, res) => {
    const { identifier, rfidData } = req.body;
    if (users[identifier] && users[identifier] === rfidData) {
        res.send({ success: true, message: "Authentification réussie" });
    } else {
        res.send({ success: false, message: "Échec de l'authentification" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

