const clients = [
  { name: 'ClientA', apiKey: 'abc123', permissions: ['read'] },
  { name: 'ClientB', apiKey: 'def456', permissions: ['read', 'write'] },
  { name: 'ClientC', apiKey: 'ghi789', permissions: [] }
];

function apiKeyAuth(req, res, next) {
    const key = req.header('X-API-Key');

    if (!key) {
        return res.status(401).json({
            message: 'Api key missing'
        });
    }

    const client = clients.find(c => 
        c.apiKey === key
    );

    if (!client) {
        return res.status(401).json({
            message: 'Invalid API key'
        });
    }

    req.client = client;
    next();
}

module.exports = {
    apiKeyAuth
};