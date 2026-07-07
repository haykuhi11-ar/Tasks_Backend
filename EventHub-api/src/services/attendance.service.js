const eventService = require('./event.service');
const Event = require('../models/Event');
const Attendance = require('../models/Attendance');
const { ConflictError, NotFoundError } = require('../errors');
const ERROR_CODES = require('../errors/error.codes');


async function joinEvent(eventId, userId) {
    await eventService.getEventOrThrow(eventId);

    const reserved = await Event.findOneAndUpdate(
        { _id: eventId, $expr: { $lt: ['$attendeeCount', '$capacity'] } },
        { $inc: { attendeeCount: 1 } },
        { new: true }
    );

    if (!reserved) {
        throw new ConflictError(
            'This event has reached its capacity',
            ERROR_CODES.EVENT_FULL
        );
    }

    try {
        const attendance = await Attendance.create({ user: userId, event: eventId, status: 'joined' });
        return attendance;
    } catch (error) {
        await Event.updateOne({ _id: eventId }, { $inc: { attendeeCount: -1 } });
        if (error.code === 11000) {
            throw new ConflictError(
                'You have already joined this event',
                ERROR_CODES.ALREADY_JOINED
            );
        }
        throw error;
    }
}

async function leavEvent(eventId, userId) {
    const attendance = await Attendance.findOneAndUpdate(
        { event: eventId, user: userId, status: 'joined' },
        { status: 'left', leftAt: new Date() },
        { new: true }
    );

    if (!attendance) {
        throw new NotFoundError(
            'You have not joined this event',
            ERROR_CODES.ATTENDANCE_NOT_FOUND
        );
    }

    await Event.updateOne({ _id: eventId }, { $inc: { attendeeCount: -1 } });
    return attendance;
}

async function listAttendees(eventId, { page, limit }) {
    await eventService.getEventOrThrow(eventId);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        Attendance.find({ event: eventId, status: 'joined' })
            .populate('user', 'name')
            .sort({ joinedAt: 1 })
            .skip(skip)
            .limit(limit),
        Attendance.countDocuments({ event: eventId, status: 'joined' })
    ]);

    return {
        items,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
}

async function hasAttended(eventId, userId) {
    const [attendance, event] = await Promise.all([
        Attendance.findOne({ event: eventId, user: userId }),
        Event.findById(eventId).select('endTime')
    ]);

    if (!attendance || !event) return false;
    return event.endTime <= new Date();
}

module.exports = {
    joinEvent,
    leavEvent,
    listAttendees,
    hasAttended
}

