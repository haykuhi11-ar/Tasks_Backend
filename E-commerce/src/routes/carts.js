const express = require("express");
const getUserCart = require("../controllers/getUserCart");
const authorization = require("../middleware/authorization");
const addProduct = require("../controllers/addProduct");
const deleteItem = require("../controllers/deleteItem");
const deleteAllItems = require("../controllers/deleteAllItems");
const router = express.Router();

router.get('/:user_id', authorization, getUserCart);
router.post('/:user_id', authorization, addProduct);
router.delete('/:user_id/items/:product_id', authorization, deleteItem);
router.delete('/:user_id', authorization, deleteAllItems);

module.exports = router;