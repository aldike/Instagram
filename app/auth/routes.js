const express = require('express');
const router = express.Router();
const passport = require('passport');
const {sendVerificationEmail, verifyCode, loginUser, createUsernamePassword, editUser} = require('./controllers')

router.post('/api/auth/sendmail', sendVerificationEmail)
router.post('/api/auth/verifycode', verifyCode)
router.post('/api/auth/create-username-password', createUsernamePassword);
router.post('/api/auth/login', loginUser)
router.put('/api/user/edit', passport.authenticate('jwt', {session: false}), editUser)

module.exports = router;