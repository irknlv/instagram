const validateUser = async(req, res, next) => {
    let errors = {};
    if(!req.body.email || req.body.email.length <= 0){
        errors.email = 'Поле "Почта" обязательное';
    }
    if(!req.body.login || req.body.login.length <= 0){
        errors.login = 'Поле "Логин" обязательное';
    }
    if(!req.body.password || req.body.password.length <= 0){
        errors.password = 'Поле "Пароль" обязательное';
    }
    if(!req.body.fullname || req.body.fullname.length <= 0){
        errors.fullname = 'Поле "Имя" обязательное';
    }
    if(JSON.stringify(errors) !== JSON.stringify({})){
        res.status(400).send(errors);
    } else{
        next()
    }
}

module.exports = {
    validateUser,
}