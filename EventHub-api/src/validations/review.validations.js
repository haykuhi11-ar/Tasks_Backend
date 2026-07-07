const { z } = require('zod');

const createReviewSchema = z.object({
    params: z.object({ eventId: z.string().length(24) }),
    body: z.object({
        rating: z.coerce.number().int().min(1).max(5),
        comment: z.string().trim().max(500).optional()
    })
});

const listReviewQuerySchema = z.object({
    params: z.object({ eventId: z.string().length(24) }),
    query: z.object({
        page: z.coerce.number().int().min(1).optional().default(1),
        limit: z.coerce.number().int().min(1).max(100).optional().default(20)
    })
});

const reviewIdParamSchema = z.object({
    params: z.object({ reviewId: z.string().length(24) }),
});

module.exports = {
    createReviewSchema,
    listReviewQuerySchema,
    reviewIdParamSchema
};
