function apiPermission(permission) {
    return (req, res, next) => {
        if (!req.client.permissions.includes(permission)) {
            return res.status(403).json({
                message: 'Permission denied'
            });
        }
        next();
    };
}

module.exports = apiPermission;