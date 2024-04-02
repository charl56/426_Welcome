const express = require('express');
const router = express.Router();

// Controler Sections
const welcomeCtrl = require('../controllers/welcome')
// Routes
router.post('/login', welcomeCtrl.login);          
router.get('/check', welcomeCtrl.check);          
// Export 
module.exports = router;