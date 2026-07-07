const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const asyncHandler = require('../utils/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { 
    listEventQuerySchema, 
    eventIdParamSchema,
    createEventSchema,
    updateEventSchema,
    addAgendaItemSchema
} = require('../validations/event.validation');
   
// Public — anyone can browse/search events, no auth required.
router.get('/', validate(listEventQuerySchema), asyncHandler(eventController.list));
router.get('/:eventId', validate(eventIdParamSchema), asyncHandler(eventController.getById));
router.get('/:eventId/attendees', validate(eventIdParamSchema), asyncHandler(eventController.listAttendees));


// Organizer-only — creating/editing events.
router.post('/', authMiddleware, roleMiddleware('organizer'), validate(createEventSchema), asyncHandler(eventController.create));
router.patch('/:eventId', authMiddleware, roleMiddleware('organizer'), validate(updateEventSchema), asyncHandler(eventController.update));
router.delete('/:eventId', authMiddleware, roleMiddleware('organizer'), validate(eventIdParamSchema), asyncHandler(eventController.remove));
router.post('/:eventId/agenda', authMiddleware, roleMiddleware('organizer'), validate(addAgendaItemSchema), asyncHandler(eventController.addAgendaItem));

// Member actions — any authenticated user can join/leave.
router.post('/:eventId/join', authMiddleware, validate(eventIdParamSchema), asyncHandler(eventController.join));
router.delete('/:eventId/join', authMiddleware, validate(eventIdParamSchema), asyncHandler(eventController.leave));

module.exports = router;