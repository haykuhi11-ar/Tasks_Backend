const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        status: {
            type: String,
            enum: ['joined', 'left'],
            default: 'joined'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        leftAt: {
            type: Date,
            default: null
        }
    }, { timestamps: true }
);

// Enforces "at most one active join per user per event" at the
// database level. Partial (only applies while status === 'joined')
// so a user who left can create a fresh 'joined' document later —
// the old 'left' document remains as history.

attendanceSchema.index(
  { user: 1, event: 1 },
  { unique: true, partialFilterExpression: { status: 'joined' } }
);

attendanceSchema.index(
    { event: 1, status: 1 },
);

module.exports = mongoose.model('Attendance', attendanceSchema);