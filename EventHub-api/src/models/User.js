const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const env = require("../config/env");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        email: {
            type: String,
            required: true,
            unique: true,  // DB-level guarantee against duplicate registration, race-safe
            lowercase: true,
            trim: true
        },

        // select: false -> excluded from query results by default; must be
        // explicitly requested with .select('+passwordHash') (see login flow).

        passwordHash: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: ['member', 'organizer'],
            default: 'member'
        },
    }, { timestamps: true }
);

const transformOptions = {
    transform: (_doc, ret) => {
        delete ret.passwordHash;
        delete ret._v;
        return ret;
    }
};

// Hides passwordHash and __v on any serialization — not just
// res.json() (toJSON), but also manual .toObject() calls.
userSchema.set('toJSON', transformOptions);
userSchema.set('toObject', transformOptions);

/**
 * Hashes passwordHash before saving, only if it was modified — avoids
 * re-hashing an already-hashed value on unrelated updates (e.g.
 * changing `name`), which would otherwise permanently break login.
 *
 * NOTE: the caller (auth.service.js) puts the RAW password into this
 * field at creation time; this hook is what turns it into a real hash
 * before it's ever persisted.
 */

userSchema.pre('save', async function hashPasswordBeforeSave(next) {
    const user = this;

    if (!user.isModified('passwordHash')) {
        return next();
    }

    try {
        const salt = env.bcryptSaltRounds;
        user.passwordHash = await bcrypt.hash(user.passwordHash, salt);

        next();

    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);