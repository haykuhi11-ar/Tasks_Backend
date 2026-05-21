const { readJson, writeJson } = require("../utils/fileDb");


async function habitsRead() {
    const habits = await readJson('habits.json');
    return habits;
}

async function habitsWrite(habits) {
    await writeJson('habits.json' ,habits);
}

module.exports = { habitsRead, habitsWrite }