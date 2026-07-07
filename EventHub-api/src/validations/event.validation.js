const { z } = require('zod');

// Reusable piece: ISO date string coerced into a real Date object.
const isoDate = z.coerce.date();

const agendaItemSchema = z.object({
    title: z.string().trim().min(1).max(150),
    startTime: isoDate,
    endTime: isoDate,
    speaker: z.string().trim().max(100).optional(),
});

const createEventSchema = z.object({
    body: z.object({
        title: z.string().trim().min(3).max(150),
        description: z.string().trim().min(10).max(1000),
        category: z.string().trim().min(2).max(50),
        location: z.string().trim().min(2).max(100),
        startTime: isoDate,
        endTime: isoDate,
        capacity: z.coerce.number().int().min(1).max(1000),
        agenda: z.array(agendaItemSchema).optional().default([])
    })
        .refine((data) => data.endTime > data.startTime, {
            message: 'endTime must be after startTime',
            path: ['endTime']
        })
});

const updateEventSchema = z.object({
    params: z.object({ eventId: z.string().length(24) }),
    body: z
        .object({
            title: z.string().trim().min(3).max(150).optional(),
            description: z.string().trim().min(10).max(1000).optional(),
            category: z.string().trim().min(2).max(50).optional(),
            location: z.string().trim().min(2).max(100).optional(),
            startTime: isoDate.optional(),
            endTime: isoDate.optional(),
            capacity: z.coerce.number().int().min(1).max(1000).optional(),
            agenda: z.array(agendaItemSchema).optional(),
        })
        .refine(
            (data) =>
                !data.startTime || !data.endTime || data.endTime > data.startTime,
            {
                message: 'endTime must be after startTime', path: ['endTime']
            }
        )
});

const eventIdParamSchema = z.object({
    params: z.object({ eventId: z.string().length(24) }),
});

const listEventQuerySchema = z.object({
    query: z.object({
        category: z.string().trim().toLowerCase().optional(),
        dateFrom: isoDate.optional(),
        dateTo: isoDate.optional(),
        page: z.coerce.number().int().min(1).optional().default(1),
        limit: z.coerce.number().int().min(1).max(100).optional().default(20),
    })
});

const addAgendaItemSchema = z.object({
    params: z.object({ eventId: z.string().length(24) }),
    body: agendaItemSchema,
});

module.exports = {
    createEventSchema,
    updateEventSchema,
    eventIdParamSchema,
    listEventQuerySchema,
    addAgendaItemSchema
}
