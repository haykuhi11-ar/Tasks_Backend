const express = require('express');
const validateMiddleware = require('../middlewares/validate.middleware');
const { authMiddleware } = require('../middlewares/auth.middleware');
const habitsControll = require('../controllers/habits.controller');
const router = express.Router();

router.get('/habits', authMiddleware, habitsControll.getControl);
router.get('/habits/:id', authMiddleware, habitsControll.getByIdControl);
router.post('/habits',authMiddleware, validateMiddleware, habitsControll.postHabitControl);
router.patch('/habits/:id',authMiddleware, validateMiddleware, habitsControll.patchHabitControl);
router.post('/habits/:id/check-in',authMiddleware, validateMiddleware, habitsControll.postCheckInControl);
router.delete('/habits/:id', authMiddleware, habitsControll.deleteHabitControl);

module.exports = router;