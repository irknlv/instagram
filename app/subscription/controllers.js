const Subscription = require('./Subscription')
const User = require('../auth/models/User')

const subscribeTo = async(req, res) => {
    if(req.body.profileId && req.body.profileId.length > 0){
        const profile = await User.findByPk(req.body.profileId);
        const subscription = await Subscription.findOne({
            where: {
                profileId: req.body.profileId,
                followerId: req.user.id
            }
        })
        if(!profile){
            res.status(401).send({message: 'Такого профиля не существует'})
        } else if(subscription){
            res.status(402).send({message: 'Пользователь уже подписан'})
        } else if(profile && !profile.private){
            const subscription = await Subscription.create({
                profileId: req.body.profileId,
                followerId: req.user.id,
                status: true,
            });
            res.status(200).send({message: 'Вы подписались!'})
        } else if(profile && profile.private){
            const subscription = await Subscription.create({
                profileId: req.body.profileId,
                followerId: req.user.id,
                status: false,
            });
            res.status(200).send({message: 'Запрос на подписку отправлен'})
        }
    } else {
        res.status(403).end()
    }
}
const unSubscribeFrom = async(req, res) => {
    if(req.body.profileId && req.body.profileId.length > 0){
        const subscription = await Subscription.findOne({
            where: {
                profileId: req.body.profileId,
                followerId: req.user.id
            }
        })
        if(subscription){
            await Subscription.destroy({
                where: {
                    profileId: req.body.profileId,
                    followerId: req.user.id
                }
            })
            res.status(200).end()
        } else {
            res.status(401).send({message: 'Подписки нет'})
        }
    } else {
        res.status(402).end()
    }
}
const allowSubscription = async(req, res) => {
    if(req.body.followerId && req.body.followerId.length > 0){
        const subscription = await Subscription.findOne({
            where: {
                profileId: req.user.id,
                followerId: req.body.followerId,
            }
        })
        if(subscription && subscription.status){
            res.status(401).send({message: 'Подписка уже осуществлена'})
        }
        if(subscription && !subscription.status){
            await Subscription.update({
                status: true,
            },
            {
                where: {
                    profileId: req.user.id,
                    followerId: req.body.followerId,
                }
            })
            res.status(200).send({message: 'Подписка принята'})
        } else {
            res.status(402).send({message: 'Подписки нету'})
        }
    } else{
        res.status(403).end()
    }
}
const getFollowers = async(req, res) => {
    const profile = await User.findOne({where: {login: req.params.username}});
    if(profile){
        const followers = await Subscription.findAll({
            where: {
                profileId: profile.id,
                status: true,
            }, 
            include: [
                    {
                        model: User,
                        as: 'profile'
                    },
                    {
                        model: User,
                        as: 'follower'
                    }
                ]
        })
        res.status(200).send(followers);
    } else {
        res.status(400).send({message: 'Такого профиля не существует'})
    }
}

const getProfiles = async(req, res) => {
    const follower = await User.findOne({where: {login: req.params.username}});
    if(follower){
        const followers = await Subscription.findAll({
            where: {
                followerId: follower.id,
                status: true,
            }, 
            include: [
                    {
                        model: User,
                        as: 'profile'
                    },
                    {
                        model: User,
                        as: 'follower'
                    }
                ]
        })
        res.status(200).send(followers);
    } else {
        res.status(400).send({message: 'Такого профиля не существует'})
    }
}
module.exports = {
    subscribeTo, 
    unSubscribeFrom, 
    allowSubscription, 
    getFollowers,
    getProfiles,
}