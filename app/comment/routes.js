const express = require('express');
const router = express.Router();
const {
    writeComment,
    deleteComment,
    getCommentsByPost,
    likeComment,
    disLikeComment,
    getLikesByComment
} = require('./controllers')

const passport = require('passport');

router.post('/api/comment', passport.authenticate('jwt', {session: false}), writeComment);
router.delete('/api/comment/:id', passport.authenticate('jwt', {session: false}), deleteComment)
router.get('/api/comment/post/:id', getCommentsByPost)

router.post('/api/comment/like', passport.authenticate('jwt', {session: false}), likeComment);
router.post('/api/comment/dislike', passport.authenticate('jwt', {session: false}), disLikeComment);
router.get('/api/comment/likes/:comId', getLikesByComment)
module.exports = router;