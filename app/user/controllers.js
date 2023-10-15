const fs = require('fs-extra');
const upload = require('../../config/multerUserConfig'); // Импортируем настройки multer
const User = require('../auth/models/User');
const jwt = require('jsonwebtoken')
const {jwtOptions} = require('../auth/passport');
const Role = require('../auth/models/Role');


const updatePhoto = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if(user.photoUrl && user.photoUrl.length>0){
        try {
            await fs.unlinkSync('.' + req.user.photoUrl);
          } catch (error) {
            console.error('Ошибка при удалении старой аватарки:', error);
          }
    } 
    if(req.file){
        await User.update({
            photoUrl: `/media/avatars/${req.file.filename}`, // сохраняем путь к файлу в базу данных
        },
        {
            where: {
                id: req.user.id
            }
        });
        res.status(200).end()
    } else {
        res.status(400).send({message: 'Не загружена фотография'})
    }
    
};

const editUser = async(req, res) => {
    const user = await User.findByPk(req.user.id)
    await User.update({
        fullname: req.body.fullname,
        biography: req.body.biography,
        gender: req.body.gender,
        private: req.body.private,
    },
    {
        where: {id: req.user.id}
    })
    if(req.body.login != user.login){
        await User.update({
            login: req.body.login
        },
        {
            where: {id: req.user.id}
        })
    }
    const role = await Role.findOne({where: {name: 'user'}})
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        login: user.login,
        role: {
            id: role.id,
            name: role.name
        }
    }, jwtOptions.secretOrKey, {
        expiresIn: 24*60*60*365
    });
    res.status(200).send({token});
}

const editEmail = async(req, res) => {
    const user = await User.findByPk(req.user.id)
    if(req.body.email && req.body.email != user.email){
        await User.update({
            email: req.body.email,
            active: false,
        },
        {
            where: {id: req.user.id}
        })
        res.status(200).send({message: 'На вашу почту было выслано письмо с верификацией'})
    } else { 
        res.status(400).end()
    }
}

const getUser = async(req, res) => {
    if(req.params.username && req.params.username.length > 0){
        const user = await User.findOne({where: {login: req.params.username}})
        if(user){
            res.status(200).send(user);
        } else {
        res.status(400).send({message: 'Такого пользователя не существует!'})
        }
    }

}
const getUserById = async(req, res) => {
    if(req.params.id && req.params.id.length > 0){
        const user = await User.findOne({where: {id: req.params.id}})
        if(user){
            res.status(200).send(user);
        } else {
        res.status(400).send({message: 'Такого пользователя не существует!'})
        }
    }
}
const getInfoAboutMe = async(req, res) => {
    if(req.user){
        res.status(200).send(req.user);
    } else {
    res.status(400).send({message: 'Вы не авторизованы!'})
    }
}
module.exports = { 
    updatePhoto,
    editUser,
    editEmail,
    getUser,
    getInfoAboutMe,
    getUserById,
};