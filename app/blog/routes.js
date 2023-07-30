const express = require('express');
const router = express.Router();
const {createPost, getMyPosts, getPost} = require('./controllers')
// const {isEmployee} = require('../auth/middlewares');
const passport = require('passport');
// const {validateResume, isResumeAuthor} = require('./middlewares')


router.post('/api/post', passport.authenticate('jwt', {session: false}), createPost)
router.get('/api/post', passport.authenticate('jwt', {session: false}), getMyPosts)
router.get('/api/post/:id', passport.authenticate('jwt', {session: false}), getPost)
// router.delete('/api/resume/:id', passport.authenticate('jwt', {session: false}), isEmployee, isResumeAuthor, deleteResume)
// router.put('/api/resume/:id', passport.authenticate('jwt', {session: false}), isEmployee, isResumeAuthor, validateResume, editResume)


module.exports = router;