const express = require('express');
const fs = require('fs/promises');
const { join } = require('path');
const path = require('path');
const { readDb } = require('../utils/db');

const taskPath = path.join(process.cwd(), 'db', 'tasks.json');


const router = express.Router();

router.get('/', async (req, res, next) => {
    const tasks = await readDb();
    res.json(tasks);
});

router.get('/:taskId', async (req, res, next) => {
    const tasks = await readDb();
    const { taskId } = req.params;
    const task = tasks.find(item => item.id === taskId);
    if (!task) {
        res.status(404).json({ message: 'task not found' });
        return;
    } 
    res.json(task);
});

router.post('/', async (req, res, next) => {

})


module.exports = {
    tasksRouter: router,
}