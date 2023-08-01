const express = require('express');
const router = express.Router();
const {createPost, getMyPosts, getAllPosts, getPost, deletePost} = require('./controllers')
// const {isEmployee} = require('../auth/middlewares');
const passport = require('passport');
const {validatePost, isPostAuthor} = require('./middlewares')


router.post('/api/post', passport.authenticate('jwt', {session: false}), validatePost, createPost)
router.get('/api/post', passport.authenticate('jwt', {session: false}), getMyPosts)
router.get('/api/post/all', passport.authenticate('jwt', {session: false}), getAllPosts)
router.get('/api/post/:id', passport.authenticate('jwt', {session: false}), getPost)
router.delete('/api/post/:id', passport.authenticate('jwt', {session: false}), isPostAuthor, deletePost)
// router.put('/api/resume/:id', passport.authenticate('jwt', {session: false}), isEmployee, isResumeAuthor, validateResume, editResume)


module.exports = router;