const express = require('express');
const UserClientController = require('../controllers/UserClientController');

const router = express.Router();

router.post('/register', UserClientController.register);
router.post('/login', UserClientController.login);
router.get('/user/:id', UserClientController.getUserById);
router.get('/check-user', UserClientController.checkUser);

module.exports = router;