const express = require('express');
const router = express.Router();

// Controler Sections
const welcomeCtrl = require('../controllers/welcome')
// Routes
// router.put('/:id', welcomePhraseCtrl.editPhrase);          
router.get('/', welcomeCtrl.getAllPhrases);          
// Export 
module.exports = router;