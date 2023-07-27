const sendEMail = require('../utils/sendMail')
const AuthCode = require('../auth/models/AuthCode')
const User = require('../auth/models/User')
const Role = require('../auth/models/Role')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const {jwtOptions} = require('./passport')


const createUser = async(req, res) => {
    const code = "" + Date.now()
    AuthCode.create({
        email: req.body.email,
        code: code,
        validTill: Date.now() + 360000
    })
    const checkUser = await User.findOne({where: {email: req.body.email}});
        if (checkUser) {
            if(!checkUser.active){
                sendEMail(req.body.email, "Instagram account verification", code);
                res.status(401).send({message: 'Пользователь с такими данными уже существует. Было выслано повторное письмо, пройдите верификацию'})    
            } else if(checkUser.active){
                res.status(401).send({message: 'Пользователь с таким email уже существует.'})    
            }
        } else {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const user = await User.create({
                email: req.body.email,
                login: req.body.login,
                password: hashedPassword,
                fullname: req.body.fullname,
                private: false,
                active: false,
            });
            sendEMail(req.body.email, "Instagram account verification", code);
            res.status(200).end();
          } catch (error) {
            res.status(404).send({error})
          }
      }
}

const verifyCode = async(req, res) => {
    const authCode = await AuthCode.findOne(
        {
            where: {code: req.params.code},
            order: [['validTill', 'DESC']],
        })        
    if(!authCode){
        res.status(401).send({error: "code is invalid"})
    } else if(new Date(authCode.validTill).getTime() < Date.now()) {
        res.status(402).send({error: "code is invalid"})
    }
      else {
        const user = await User.findOne({ where: { email: authCode.email } });
        if (user) {
        user.active = true;
        await user.save();
        res.status(200).send('Верификация прошла успешно!');
        } else {
        res.status(403).end();
        }
    }
}

const signIn = async(req, res) => {
    if(!req.body.loginText || !req.body.password){
        res.status(401).send({message: 'Заполните все данные!'})
    } else {
        const user = await User.findOne({
            where: {
              [Op.or]: [
                { email: req.body.loginText  },
                { login: req.body.loginText  },
              ],
            },
        })
        if(!user){
            res.status(402).send({message: 'Пользователя с таким логином или email не существует'})
        }
        if(user && !user.active){
            console.log(user)
            const code = "" + Date.now()
            AuthCode.create({
                email: user.email,
                code: code,
                validTill: Date.now() + 360000
            })
            sendEMail(user.email, "Instagram account verification", code);
            res.status(402).send({message: 'Подтвердите свой email!'})
        }
        if(user && user.active){
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (passwordMatch) {
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
              } else {
                res.status(403).send({ message: 'Неверный пароль.' });
              }
        }
    }
}
module.exports = {
    createUser,
    verifyCode,
    signIn,
}