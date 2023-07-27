const express = require('express');
const router = express.Router();
const upload = require('../../config/multerStoryConfig');
const {
    createStory, 
    deleteStory,
    getStoriesByUser,
    watchStory,
} = require('./controllers')
const passport = require('passport');

router.post('/api/story/createNew', passport.authenticate('jwt', {session: false}), upload.single('mediaStory'), createStory)
router.delete('/api/story/:id', passport.authenticate('jwt', {session: false}), deleteStory);
router.get('/api/story/:username', getStoriesByUser)
router.post('/api/story/watch', passport.authenticate('jwt', {session: false}), watchStory)

module.exports = router