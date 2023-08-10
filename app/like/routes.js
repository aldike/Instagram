const express = require('express');
const router = express.Router();
const {likePost, unlikePost, likeComment, unlikeComment, likeStory, unlikeStory} = require('./controllers')
const passport = require('passport');


router.post('/api/like/post/:id', passport.authenticate('jwt', {session: false}), likePost)
router.delete('/api/unlike/post/:id', passport.authenticate('jwt', {session: false}), unlikePost)
router.post('/api/like/comment/:id', passport.authenticate('jwt', {session: false}), likeComment)
router.delete('/api/unlike/comment/:id', passport.authenticate('jwt', {session: false}), unlikeComment)
router.post('/api/like/story/:id', passport.authenticate('jwt', {session: false}), likeStory)
router.delete('/api/unlike/story/:id', passport.authenticate('jwt', {session: false}), unlikeStory)


module.exports = router;