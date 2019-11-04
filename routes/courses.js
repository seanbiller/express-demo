app.get('/api/courses', (request, response) => {
    response.send(courses)
})

app.get('/api/courses/:id', (request, response) => {
    const course = courses.find(c => c.id === parseInt(request.params.id))
    if (!course) {
        response.status(404).send('The course with the given ID was not found')
        return
    }
    response.send(course)
    
})

app.post('/api/courses', (request, response) => {
    const { error } = schema.validate({ name: request.body.name})
    if (error) {
        response.status(400).send(error.details[0].message)
        return
    }
    const course = {
        id: courses.length + 1,
        name: request.body.name
    }
    courses.push(course)
    response.send(course)
})

app.put('/api/courses/:id', (request, response) => {
    const course = courses.find(c => c.id === parseInt(request.params.id))
    if (!course) {
         response.status(404).send('The course with the given ID was not found')
        return
        }

    const { error } = schema.validate({ name: request.body.name})
    if (error) {
        response.status(400).send(error.message)
        return
    }

    course.name = request.body.name
    response.send(course)
})

app.delete('/api/courses/:id', (request, response) => {
    const course = courses.find(c => c.id === parseInt(request.params.id))
    if (!course) {
         response.status(404).send('The course with the given ID was not found')
        return
        }
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    
    response.send(course)
})
