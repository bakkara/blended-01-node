const fs = require('fs/promises');
const { join } = require('path');
const path = require('path');

const taskPath = path.join(process.cwd(), 'db', 'tasks.json');

const readDb = async () => {
    const rawJson = await fs.readFile(taskPath);
    const tasks = JSON.parse(rawJson);
    return tasks;
}

module.exports = {
    readDb
};