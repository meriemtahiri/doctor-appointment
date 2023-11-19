const router = require('express').Router();
const { login, register, logout } = require('../controllers/authentication');


//LOG IN
router.post('/login', login);

//SIGN UP
router.post('/register', register)

//LOG OUT
router.post('/logout',logout)

module.exports = router;