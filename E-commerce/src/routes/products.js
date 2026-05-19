const express = require("express");
const router = express.Router();
const getAllProducts = require("../controllers/getAllProducts");
const getProductsById = require("../controllers/getProductById");
const authorization = require("../middleware/authorization");
const isAdmin = require("../middleware/isAdmin");
const validateProduct = require("../middleware/validateProduct");
const createNewProduct = require("../controllers/createNewProduct");
const updateProduct = require("../controllers/updateProduct");
const deleteProduct = require("../controllers/deleteProduct");

router.get('/', getAllProducts);
router.get('/:id', getProductsById);
router.post('/', authorization, isAdmin, validateProduct, createNewProduct);
router.put('/:id', authorization, isAdmin, updateProduct);
router.delete('/:id', authorization, isAdmin, deleteProduct);



module.exports = router;