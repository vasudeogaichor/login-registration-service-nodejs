const express = require('express');
const router = express.Router();
const {authControllers} = require('../controllers');

router.post('/register', authControllers.userRegister);
router.post('/login', authControllers.userLogin);
router.post('/forgot-password', authControllers.userRequestResetToken);

module.exports = router;