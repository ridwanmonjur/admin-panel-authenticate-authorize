var express = require('express');
const { getProducts, getProductById,  deleteProducts, createProduct, editProduct } = require("../controllers/product")
const { Roles } = require("../helper/Roles");
const { authorize } = require("../middleware/authorize");
const { protect } = require("../middleware/protect");
const multer = require("../middleware/multer")
const router = express.Router();

router.route('/')
        .get(protect, getProducts)
        .post(protect, authorize(Roles.Admin, Roles.Seller), multer.single("image"), createProduct)

router.route('/:productId')
        .get(getProductById)
        .put(protect, authorize(Roles.Seller, Roles.Admin), multer.single("image"), editProduct)

router.post("/delete", protect, authorize(Roles.Admin, Roles.Seller), deleteProducts)

module.exports = router