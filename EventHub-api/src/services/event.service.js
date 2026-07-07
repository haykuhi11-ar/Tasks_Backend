const mongoose = require("mongoose");
const { BadRequestError, NotFoundError, ForbiddenError } = require("../errors");
const ERROR_CODES = require("../errors/error.codes");
const Event = require('../models/Event');


function assertValidId(id) {
    if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestError('Invalid event id', ERROR_CODES.VALIDATION_ERROR);
    }
}

async function getEventOrThrow(eventId) {
    assertValidId(eventId);
    const event = await Event.findById(eventId);

    if (!event) {
        throw new NotFoundError('Event not found', ERROR_CODES.EVENT_NOT_FOUND);
    }

    return event;
}

function assertIsOwner(event, userId) {
    if (!event.organizer.equals(userId)) {
        throw new ForbiddenError(
            'Only the organizer who created this event may modify it',
            ERROR_CODES.NOT_EVENT_OWNER
        );
    }
}

async function createEvent(data, organizerId) {
    const event = await Event.create({ ...data, organizer: organizerId });
    return event;
}

async function listEvents({ category, dateFrom, dateTo, page, limit }) {
    const filter = {};
    if (category) filter.category = category;
    if (dateFrom || dateTo) {
        filter.startTime = {};
        if (dateFrom) filter.startTime.$gte = dateFrom;
        if (dateTo) filter.startTime.$lte = dateTo;
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        Event.find(filter).sort({ startTime: 1 }).skip(skip).limit(limit),
        Event.countDocuments(filter)
    ]);

    return {
        items,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}

async function getEventById(eventId) {
    return getEventOrThrow(eventId);
}

async function updateEvent(eventId, updates, userId) {
    const event = await getEventOrThrow(eventId);
    assertIsOwner(event, userId);

    const nextStartTime = updates.startTime ?? event.startTime;
    const nextEndTime = updates.endTime ?? event.endTime;

    if (nextEndTime <= nextStartTime) {
        throw new BadRequestError('endTime must be after startTime', ERROR_CODES.INVALID_DATE_RANGE);
    }

    Object.assign(event, updates);
    await event.save();
    return event;
}

async function deleteEvent(eventId, userId) {
    const event = await getEventOrThrow(eventId);
    assertIsOwner(event, userId);
    await event.deleteOne();
}

async function addAgendaItem(eventId, agendaItem, userId) {
    const event = await getEventOrThrow(eventId);
    assertIsOwner(event, userId);

    if (agendaItem.endTime <= agendaItem.startTime) {
        throw new BadRequestError(
            'Agenda item endTime must be after startTime',
            ERROR_CODES.INVALID_DATE_RANGE
        );
    }

    event.agenda.push(agendaItem);
    await event.save();
    return event;
}

module.exports = {
    getEventOrThrow,
    assertIsOwner,
    createEvent,
    listEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    addAgendaItem
}