const express = require('express');
const router = express.Router();
const { createUser, verifyCode, signIn } = require('./controllers');
const { validateUser } = require('./middlewares')

router.post('/api/register', validateUser, createUser)
router.get('/api/auth/verify/:code', verifyCode)
router.post('/api/login', signIn)

module.exports = router