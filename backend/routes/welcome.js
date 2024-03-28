const express = require('express');
const router = express.Router();

// Controler Sections
const welcomeCtrl = require('../controllers/welcome')
// Routes
router.post('/login', welcomeCtrl.login);          
// Export 
module.exports = router;