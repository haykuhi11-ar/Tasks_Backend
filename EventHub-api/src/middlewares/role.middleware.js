const { ForbiddenError } = require("../errors")
const ERROR_CODES = require("../errors/error.codes")

/**
 * Restricts a route to one or more roles. Must run AFTER authMiddleware,
 * since it relies on req.user being already populated by it.
 */

function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ForbiddenError('Not authenticated', ERROR_CODES.ROLE_NOT_ALLOWED));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new ForbiddenError(
                `This action requires role: ${allowedRoles.join(' or ')}`,
                ERROR_CODES.ROLE_NOT_ALLOWED
            ));
        }
        next();
    }
}

module.exports = requireRole;