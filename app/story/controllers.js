const upload = require('../../config/multerStoryConfig'); // Импортируем настройки multer
const User = require('../auth/models/User');
const Story = require('./models/Story')
const fs = require('fs-extra');
const { Op } = require('sequelize');
const StoryWatched = require('./models/StoryWatched')

const createStory = async(req, res) => {
    if(req.file){
        try {
            const { originalname, mimetype, filename } = req.file;
            const newStory = await Story.create({
                userId: req.user.id,    
                type: mimetype,
                url: `/media/stories/${filename}`,
            });
            res.status(200).send({ message: 'Story успешно добавлена' });
        } catch (error) {
            console.error(error);
            res.status(400).send({ error: 'Произошла ошибка при добавлении Story' });
        }
    } else{
        res.status(404).send({ error: 'Ошибка при создании Story'})
    }
}
const getStoriesByUser = async(req, res) => {
    const user = await User.findOne({where: {login: req.params.username}})
    try {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        // twentyFourHoursAgo.setMinutes(twentyFourHoursAgo.getMinutes() - 1);
        const stories = await Story.findAll({
            where: {
            userId: user.id,
            createdAt: {
                [Op.gte]: twentyFourHoursAgo,
            },
            },
        });
        res.status(200).json(stories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка при получении сторис' });
    }
}
const deleteStory = async(req, res) => {
    const story = await Story.findOne({
        where: {
            id: req.params.id
        }
    })
    if(story && story.userId === req.user.id) {
        await fs.unlinkSync('.' + story.url);
        const data = await Story.destroy({
            where: {
                id: req.params.id,
            }
        })
        res.status(200).end()
    } else {
        res.status(400).send({message: "Access forbidden"})
    }
    
}
const watchStory = async(req, res) => {
    if(req.body.storyId){
        const story = await Story.findByPk(req.body.storyId)
        if(story){
            const storyWatched = await StoryWatched.findOne({
                where: {
                    userId: req.user.id,
                    storyId: req.body.storyId,
                }
            })
            if(storyWatched){
                res.status(401).send({message: 'История уже была просмотрена'})
            } else {
                await StoryWatched.create({
                    userId: req.user.id,
                    storyId: story.id,
                })
                res.status(200).send({message: 'Вы просмотрели историю'})
            }
        } else {
            res.status(402).send({message: 'История не найдена'})
        }
    } else {
        res.status(403).send({message: 'История не найдена'})
    }
}
module.exports = {
    createStory,
    deleteStory,
    getStoriesByUser,
    watchStory
}