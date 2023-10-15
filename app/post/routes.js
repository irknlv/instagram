const express = require('express');
const router = express.Router();
const upload = require('../../config/multerPostConfig');
const {
    createPost,
    getAllPosts, 
    getMyPosts, 
    getPostById, 
    getPostsByUser,
    editPost,
    deletePost,
    likePost,
    disLikePost,
    savePost,
    unSavePost,
    getLikesByPost,
    getSavedPosts
} = require('./controllers')
const {isAuthor} = require('./middlewares')
const passport = require('passport');

router.post('/api/post/createNew', passport.authenticate('jwt', {session: false}), upload.array('mediaFiles'), createPost)
router.get('/api/posts', getAllPosts);
router.get('/api/posts/:username', getPostsByUser);
router.get('/api/post/:id', passport.authenticate('jwt', {session: false}), getPostById);
router.get('/api/myPosts', passport.authenticate('jwt', {session: false}), getMyPosts);
router.put('/api/post', passport.authenticate('jwt', {session: false}), isAuthor, editPost);
router.delete('/api/post/:id', passport.authenticate('jwt', {session: false}), isAuthor, deletePost);

router.post('/api/post/like', passport.authenticate('jwt', {session: false}), likePost);
router.post('/api/post/dislike', passport.authenticate('jwt', {session: false}), disLikePost);
router.get('/api/post/likes/:postId', getLikesByPost)

router.post('/api/post/save', passport.authenticate('jwt', {session: false}), savePost);
router.post('/api/post/unSave', passport.authenticate('jwt', {session: false}), unSavePost);
router.get('/api/saved', passport.authenticate('jwt', {session: false}), getSavedPosts)

module.exports = router