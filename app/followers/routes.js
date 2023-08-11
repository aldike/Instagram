const express = require('express');
const router = express.Router();
const {followUser, unFollowUser, getFollowersByUsername, getFollowsByUsername, getUserInfoByUsername, getSuggestions} = require('./controllers')
const passport = require('passport');


router.post('/api/follow/:id', passport.authenticate('jwt', {session: false}), followUser)
router.delete('/api/unfollow/:id', passport.authenticate('jwt', {session: false}), unFollowUser)
router.get('/api/followers/byUsername/:username', passport.authenticate('jwt', {session: false}), getFollowersByUsername)
router.get('/api/follows/byUsername/:username', passport.authenticate('jwt', {session: false}), getFollowsByUsername)
router.get('/api/userInfo/byUsername/:username', passport.authenticate('jwt', {session: false}), getUserInfoByUsername)
router.get('/api/suggestions', passport.authenticate('jwt', {session: false}), getSuggestions)
module.exports = router;