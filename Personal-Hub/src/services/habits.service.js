const { habitsRead, habitsWrite } = require("../models/habit.model");
const date = require("../utils/date");

async function getHabits(ownerId) {
    const habits = await habitsRead();
    const habitsFromUser = habits.filter(h => 
        h.ownerId === ownerId
    );

    return habitsFromUser || null;
}

async function getHabitById(id, ownerId) {
    const habits = await habitsRead();
    
    const habit = habits.find(h => 
        h.ownerId === ownerId && 
        h.id === id
    );
    
    return habit || null;
}

async function addHabit(habit) {
    const habits = await habitsRead();

    habits.push(habit);
    await habitsWrite(habits);
    return habits;
}

async function updateHabits(id, ownerId, updateData) {
    const habits = await habitsRead();

    const index = habits.findIndex(h => 
        h.id === id &&
        h.ownerId === ownerId
    );

    if (index === -1) return null;
    habits[index] = {
        ...habits[index],
        ...updateData,
        updateAt: date()
    }
    await habitsWrite(habits);
    return habits[index];
}

async function postHabitCheckIn(id, ownerId) {
    const habits = await habitsRead();

    const index = habits.findIndex(h => 
        h.id === id && 
        h.ownerId === ownerId
    );

    if (index === -1) return null;
    habits[index].checkIns = (checkIns[index].checkIns || 0) + 1
    await habitsWrite(habits);
    return habits[index];
}

async function deleteHabit(id, ownerId) {
    let habits = await habitsRead();

    const index = habits.findIndex(h => 
        h.id === id && 
        h.ownerId === ownerId
    );

    if (index === -1) return null;
    const deletedHabit = habits[index];

    habits = habits.filter(h => 
        !(h.id === id &&
        h.ownerId === ownerId)
    );
    await habitsWrite(habits);
    return deletedHabit;
}

module.exports = {
    getHabits,
    getHabitById,
    addHabit,
    updateHabits,
    postHabitCheckIn,
    deleteHabit
}