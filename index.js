const debug = require('debug')('app:startup')
const Joi = require('@hapi/joi')
const express = require('express')
const app = express()
const logger = require('./logger')
const authenticate = require('./authenticate')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')

app.set('view engine', 'pug')
app.set('views', './views')



app.use(express.json())
app.use(express.urlencoded({extended: true})) // the URL would look like key=value&key=value
app.use(express.static('public'))
app.use(helmet())

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    debug('Morgan enabled...')
}


app.use(logger)
app.use(authenticate)

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

const schema = Joi.object().keys({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(10)
    .required(),
})

app.get('/', (request, response) => {
    response.render('index', { title: 'My Express App', message: 'Hello'})
})


// PORT 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))

