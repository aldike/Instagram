const express = require('express');
const router = express.Router();
const {createPost, getMyPosts, getAllPosts, getPost, deletePost, editPost, createStory, deleteStory, getUserStories, writeCommentary, deleteCommentary, getCommentsByPostId, getPostsByUsername} = require('./controllers')
const passport = require('passport');
const {validatePost, validateStory, isPostAuthor, isStoryAuthor, isPostOrCommentAuthor} = require('./middlewares')
const {upload} = require('./utils')

router.post('/api/post', passport.authenticate('jwt', {session: false}), upload.single('post_media'), validatePost, createPost)
router.get('/api/post', passport.authenticate('jwt', {session: false}), getMyPosts)
router.get('/api/post/all', passport.authenticate('jwt', {session: false}), getAllPosts)
router.get('/api/post/:id', passport.authenticate('jwt', {session: false}), getPost)
router.delete('/api/post/:id', passport.authenticate('jwt', {session: false}), isPostAuthor, deletePost)
router.put('/api/post/:id', passport.authenticate('jwt', {session: false}), upload.single('post_media'), isPostAuthor, validatePost, editPost)
router.post('/api/story', passport.authenticate('jwt', {session: false}), upload.single('story_media'), validateStory, createStory)
router.delete('/api/story/:id', passport.authenticate('jwt', {session: false}), isStoryAuthor, deleteStory)
router.get('/api/story/user/:id', passport.authenticate('jwt', {session: false}), getUserStories)
router.post('/api/comment/:id', passport.authenticate('jwt', {session: false}), writeCommentary)
router.delete('/api/comment/:id', passport.authenticate('jwt', {session: false}), isPostOrCommentAuthor, deleteCommentary)
router.get('/api/comment/post/:id', passport.authenticate('jwt', {session: false}), getCommentsByPostId)
router.get('/api/posts/byUsername/:username', passport.authenticate('jwt', {session: false}), getPostsByUsername)

module.exports = router;