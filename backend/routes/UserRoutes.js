const express = require('express');
const UserClientController = require('../controllers/UserClientController');


//Middleware 

const verifyToken = require('../helpers/verify-token');

const router = express.Router();

router.post('/register', UserClientController.register);
router.post('/login', UserClientController.login);
router.get('/user/:id', UserClientController.getUserById);
router.get('/check-user', UserClientController.checkUser);
router.get('/', verifyToken, UserClientController.home)


module.exports = router;