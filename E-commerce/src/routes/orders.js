const express = require("express");
const authorization = require("../middleware/authorization");
const isAdmin = require("../middleware/isAdmin");
const createNewOrder = require("../controllers/createNewOrder");
const getOrder = require("../controllers/getOrder");
const getOrderById = require("../controllers/getOrderById");
const updateOrderStatus = require("../controllers/updateOrderStatus");
const router = express.Router();

router.post('/:user_id', authorization, createNewOrder);
router.get('/user/:user_id', authorization, getOrder);
router.get('/:id/', authorization, getOrderById);
router.put('/:id/status', authorization, isAdmin, updateOrderStatus);

module.exports = router;