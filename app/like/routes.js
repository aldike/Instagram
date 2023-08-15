const express = require('express');
const router = express.Router();
const {likeUnlikePost, likeUnlikeComment, likeUnlikeStory} = require('./controllers')
const passport = require('passport');


router.post('/api/like/post/:id', passport.authenticate('jwt', {session: false}), likeUnlikePost)
router.post('/api/like/comment/:id', passport.authenticate('jwt', {session: false}), likeUnlikeComment)
router.post('/api/like/story/:id', passport.authenticate('jwt', {session: false}), likeUnlikeStory)


module.exports = router;