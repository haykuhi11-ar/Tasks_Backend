const mongoose = require('mongoose');

const agendaItemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        speaker: {
            type: String,
            trim: true,
            maxlength: 100
        }
    },
    { _id: true }  // each agenda item gets its own id, referenceable independently
);

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },
        description: {
            type: String,
            required: true,
            maxlength: 1000
        },
        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        startTime: {
            type: Date,
            required: true,
            index: true
        },
        endTime: {
            type: Date,
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            min: 1
        },
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        agenda: [agendaItemSchema],
        attendeeCount: {
            type: Number,
            default: 0,
            min: 0
        },
    }, { timestamps: true }
);

// Supports "events in category X, sorted/filtered by date".
eventSchema.index({ category: 1, startTime: 1 });

eventSchema.pre('validate', function validateTimeRange(next) {
    if (this.startTime && this.endTime && this.endTime <= this.startTime) {
        return next(new Error('endTime must be after startTime'));
    }
    next();
});

module.exports = mongoose.model('Event', eventSchema);