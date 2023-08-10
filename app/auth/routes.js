const express = require('express');
const router = express.Router();
const passport = require('passport');
const {sendVerificationEmail, verifyCode, loginUser, createUsernamePassword, editUser} = require('./controllers')

router.post('/api/auth/sendmail', sendVerificationEmail)
router.post('/api/auth/verifycode', verifyCode)
router.put('/api/auth/create-username-password', passport.authenticate('jwt', {session: false}), createUsernamePassword);
router.post('/api/auth/login', passport.authenticate('jwt', {session: false}), loginUser)
router.put('/api/user/edit', passport.authenticate('jwt', {session: false}), editUser)

module.exports = router;