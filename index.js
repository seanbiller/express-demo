const Joi = require('@hapi/joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

app.get('/', (request, response) => {
    response.send('Hello World!!!')
})

app.get('/api/courses', (request, response) => {
    response.send(courses)
})

app.post('/api/courses', (request, response) => {
    const schema = Joi.object().keys({
        name: Joi.string()
        .min(3)
        .max(10)
        .required(),
    });

    const { error } = schema.validate({ name: request.body.name});
    if (error) {
       return response.status(400).send(error.details[0].message)
    }
    // if(value) {
    //     return request.body.name
    // }

    

    const course = {
        id: courses.length + 1,
        name: request.body.name
    }
    courses.push(course)
    response.send(course)
})




app.get('/api/courses/:id', (request, response) => {
    const course = courses.find(c => c.id === parseInt(request.params.id))
    if (!course) response.status(404).send('The course with the given ID was not found')
    response.send(course)
})



// PORT 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
