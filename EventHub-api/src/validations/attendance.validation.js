const { z } = require('zod');

const eventIdParamSchema = z.object({
    params: z.object({ eventId: z.string().length(24) })
});

module.exports = { eventIdParamSchema };