const express = require('express');
const { tasksRouter } = require('./routes/tasks');

const app = express();

app.post('/test', (req, res, next) => {
    res.send('Hello from test')
})

app.use('/tasks', tasksRouter)

module.exports = app;