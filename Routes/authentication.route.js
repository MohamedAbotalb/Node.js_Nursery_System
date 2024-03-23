const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authentication.controller');

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
