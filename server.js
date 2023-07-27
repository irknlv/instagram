const express = require('express');
const logger = require('morgan')
const passport = require('passport')

const app = express();

app.use(logger('dev'))
app.use(express.urlencoded())
app.use(express.json())
app.use(passport.initialize())

require('./app/auth/passport')

app.get('/', (req, res) => {
    res.send("ok")
})

app.use(require('./app/auth/routes'))
app.use(require('./app/post/routes'))
app.use(require('./app/user/routes'))
app.use(require('./app/subscription/routes'))
app.use(require('./app/comment/routes'))
app.use(require('./app/story/routes'))

const port = 8000;
app.listen(port, () => {
    console.log(`Server is listening on PORT ${port}`)
})