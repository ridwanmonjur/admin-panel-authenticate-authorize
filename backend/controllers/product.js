const { StatusCodes } = require('http-status-codes');
const { Product } = require('../models/Product');
const { extractRequestQueryForPagination } = require('../helper/extractRequestQueryForPagination');
const ObjectID = require("mongodb").ObjectID;

populate = {
    path: 'seller',
    select: 'name email _id'
}

exports.deleteProducts = async function (req, res, next) {
    try {
        await Product.deleteMany({ _id: { $in: req.body.ids } });
        return res.status(StatusCodes.NO_CONTENT).json({})
    }
    catch (error) {
        next(error);
    }
}

exports.editProduct = async function (req, res, next) {

    let productId;

    try {
        if (req.body.seller == undefined && req.role == "seller") req.body.seller = req.userID
        productId = ObjectID(req.params.productId);
        const productSearch = await Product.findById(productId);
        if (req.file == undefined) {
            req.body.image = productSearch?.image;
        }
        else {
            req.body.image = req.file.path;
        }
        const product = await Product.findByIdAndUpdate(productId, { ...req.body }, { returnOriginal: false }).populate(this.populate);
        return res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        next(error);
    }
}

exports.createProduct = async function (req, res, next) {
    try {
        if (req.body.seller == undefined && req.role == "seller") req.body.seller = req.userID
        if (req.file == undefined) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Couldn't get file path after saving!" });
        }
        else {
            if (req.file.path == undefined) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Couldn't get file path after saving!" });
            }
            req.body.image = req.file.path;
        }
        let product = new Product({ ...req.body });
        await product.save();
        return res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        next(error);
    }
}

exports.getProductById = async function (req, res, next) {
    let productId, product
    try {
        productId = ObjectID(req.params.productId);
        product = await Product.findById(productId).populate(populate);
        return res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        next(error);
    }
}

exports.getProducts = async function (req, res, next) {
    try {
        const { query, options } = extractRequestQueryForPagination(req.query);
        console.log({query, role: req.role})
        if (req.role == "seller") {
            query.seller = req.userID;
        }
        console.log({query, role: req.role})
        if (options?.populate == undefined) options.populate = populate
        const product = await Product.paginate(query, options);
        return res.status(StatusCodes.OK).json({ success: true, ...product });
    }
    catch (err) {
        next(err);
    }
}
