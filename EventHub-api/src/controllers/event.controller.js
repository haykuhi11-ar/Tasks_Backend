const eventService = require('../services/event.service');
const attendanceService = require('../services/attendance.service');

async function list(req, res) {
    const result = await eventService.listEvents(req.query);
    return res.status(200).json(result);
}

async function create(req, res) {
    const event = await eventService.createEvent(req.body, req.user.id);
    return res.status(201).json(event);
}

async function getById(req, res) {
    const event = await eventService.getEventById(req.params.eventId);
    return res.status(200).json(event);
}

async function update(req, res) {
    const event = await eventService.updateEvent(req.params.eventId, req.body, req.user.id);
    return res.status(200).json(event);
}

async function remove(req, res) {
    await eventService.deleteEvent(req.params.eventId, req.user.id);
    return res.status(204).send();
}

async function addAgendaItem(req, res) {
    const event = await eventService.addAgendaItem(req.params.eventId, req.body, req.user.id);
    return res.status(201).json(event);
}

async function join(req, res) {
    const attendance = await attendanceService.joinEvent(req.params.eventId, req.user.id);
    return res.status(201).json(attendance);
}

async function leave(req, res) {
    await attendanceService.leavEvent(req.params.eventId, req.user.id);
    return res.status(204).send();
}

async function listAttendees(req, res) {
    const result = await attendanceService.listAttendees(req.params.eventId, req.query);
    return res.status(200).json(result);
}

module.exports = {
    list,
    create,
    getById,
    update,
    remove,
    addAgendaItem,
    join,
    leave,
    listAttendees
};