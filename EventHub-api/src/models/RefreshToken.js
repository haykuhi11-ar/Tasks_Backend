const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,  // supports "find/revoke all tokens for this user"
        },

        // Only the SHA-256 hash of the raw refresh token is stored — never
        // the token itself. A database leak alone can never be used to
        // impersonate a user via their refresh token.

        tokenHash: {
            type: String,
            required: true,
            unique: true
        },
        expiresAt: {
            type: Date, required: true
        },
        revokedAt: {
            type: Date, default: null
        }
    }, { timestamps: true }
);

// MongoDB automatically deletes documents once expiresAt has passed.
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

refreshTokenSchema.methods.isActive = function isActive() {
    return !this.revokedAt && this.expiresAt > new Date();
};

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);