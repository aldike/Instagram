const express = require('express');
const router = express.Router();
const {followUser, unFollowUser} = require('./controllers')
const passport = require('passport');


router.post('/api/follow/:id', passport.authenticate('jwt', {session: false}), followUser)
router.delete('/api/unfollow/:id', passport.authenticate('jwt', {session: false}), unFollowUser)

module.exports = router;