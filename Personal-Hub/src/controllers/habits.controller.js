const habitService = require("../services/habits.service");
const AppError = require("../utils/AppError");
const date = require("../utils/date");
const generateId = require("../utils/id");

async function getControl(req, res) {
    const ownerId = req.ownerId;
    const habits = await habitService.getHabits(ownerId);
    if (!habits) {
        throw new AppError('Habits not found', 404)
    }

    return res.status(200).json(habits);
}

async function getByIdControl(req, res) {
    const id = Number(req.params.id);
    const ownerId = req.ownerId;

    const habit = await habitService.getHabitById(id, ownerId);
    
    if (!habit) {
        throw new AppError('Habits not found', 404)
    }
    return res.status(200).json(habit);
}

async function postHabitControl(req, res) {
    const ownerId = req.ownerId;
    const habits = await habitService.getHabits(ownerId);
    const id = generateId(habits);

    const newHabit = {
        id,
        ownerId,
        frequency: 'daily',
        ...req.body,
        createAt: date()
    }
    await habitService.addHabit(newHabit);
    return res.status(201).json(newHabit);
}

async function patchHabitControl(req, res) {
    const ownerId = req.ownerId;
    const id = Number(req.params.id);

    const updateHabit = await habitService.updateHabits(id, ownerId, req.body);
    if (!updateHabit) {
        throw new AppError('Habit not found', 404);
    }
    return res.status(200).json(updateHabit);
}


async function postCheckInControl(req, res) {
    const ownerId = req.ownerId;
    const id = Number(req.params.id);

    const habit = await habitService.getHabitById(id, ownerId);
    if (!habit) {
        throw new AppError('Habit not found', 404);
    }
    
    const habitChekIn = await habitService.postHabitCheckIn(id, ownerId);
    return res.status(200).json(habitChekIn);
}

async function deleteHabitControl(req, res) {
    const ownerId = req.ownerId;
    const id = Number(req.params.id);
    
    const deletedHabit = await habitService.deleteHabit(id, ownerId);

    if (!deletedHabit) {
        throw new AppError('Habit not found', 404);
    }
    return res.status(204).send();
}

module.exports = {
    getControl,
    getByIdControl,
    postCheckInControl,
    patchHabitControl,
    postHabitControl,
    deleteHabitControl
}