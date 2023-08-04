const express = require('express');
const router = express.Router();
const {createPost, getMyPosts, getAllPosts, getPost, deletePost, editPost, createStory, deleteStory, getUserStories} = require('./controllers')
const passport = require('passport');
const {validatePost, validateStory, isPostAuthor, isStoryAuthor} = require('./middlewares')


router.post('/api/post', passport.authenticate('jwt', {session: false}), validatePost, createPost)
router.get('/api/post', passport.authenticate('jwt', {session: false}), getMyPosts)
router.get('/api/post/all', passport.authenticate('jwt', {session: false}), getAllPosts)
router.get('/api/post/:id', passport.authenticate('jwt', {session: false}), getPost)
router.delete('/api/post/:id', passport.authenticate('jwt', {session: false}), isPostAuthor, deletePost)
router.put('/api/post/:id', passport.authenticate('jwt', {session: false}), isPostAuthor, validatePost, editPost)
router.post('/api/story', passport.authenticate('jwt', {session: false}), validateStory, createStory)
router.delete('/api/story/:id', passport.authenticate('jwt', {session: false}), isStoryAuthor, deleteStory)
router.get('/api/story/user/:id', passport.authenticate('jwt', {session: false}), getUserStories)



module.exports = router;