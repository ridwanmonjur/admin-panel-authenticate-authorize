const ObjectID = require("mongodb").ObjectID;
const { User } = require("../models/User");
const { StatusCodes } = require('http-status-codes');
const { extractRequestQueryForPagination } = require('../helper/extractRequestQueryForPagination');
const bcrypt = require('bcrypt')

exports.getUser = async function (req, res, next) {
    let userId, user;
    try {
        userId = ObjectID(req.params.userId);
        user = await User.findById(userId);
        if (user == null) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, message: "Wrong user ID" });
        res.status(StatusCodes.OK).json({ success: true, user });
    }
    catch (error) {
        next(error);
    }
}

exports.getUsers = async function (req, res, next) {
    let user;
    try {
        const { query, options } = extractRequestQueryForPagination(req.query)
        user = await User.paginate(query, options);
        return res.status(StatusCodes.OK).json({ success: true, ...user });
    }
    catch (error) {
        next(error);
    }
}

exports.editUserById = async function (req, res, next) {
    let userId, user;

    try {
        console.log({ started: true });
        userId = ObjectID(req.params.userId);
        const userSearch = await User.findById(userId);
        if (userSearch == null) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, message: "No user found by this id" });
        ['token', 'address', 'creditCard'].forEach((value) => {
            console.log({ value })
            if (value in req.body) req.body[value] = JSON.parse(req.body[value])
            console.log({ value })
        })
        console.log({ started: true });
        if (req.file == undefined) {
            if (userSearch?.image != undefined) req.body.image = userSearch?.image;
            delete req.body.image;
        }
        else {
            if (req.file.path == undefined) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Couldn't get file path after saving!" });
            }
            req.body.image = req.file.path;
        }
        console.log({ userSearch, body: req.body })
        user = await User.findByIdAndUpdate(userId, { ...req.body }, { returnOriginal: false });
        return res.status(StatusCodes.CREATED).json({ success: true, user, userId: req.userID, number: 0 });
    }
    catch (error) {
        next(error);
    }
}

exports.signup = async function (req, res, next) {
    try {
        ['address', 'creditCard'].forEach((value) => {
            if (value in req.body) req.body[value] = JSON.parse(req.body[value])
        })
        if (req.file == undefined) {
            delete req.body.image;
        }
        else {
            req.body.image = req.file.path;
        }
        const saltRounds = 10;
        let { name, email, password, role } = req.body;
        role ??= "customer";
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        let user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        if (req.body.password !== req.body.confirmPassword) {
            return res
                .status(StatusCodes.UNPROCESSABLE_ENTITY)
                .json({ success: false, message: "Password and confirmed password must match!" })
        }
        return res.status(StatusCodes.CREATED).json({ user, success: true });
    }
    catch (error) {
        next(error);
    }
}

exports.deleteUsers = async function (req, res, next) {
    console.log({hello: true})
    try {
        await User.deleteMany({ _id: { $in: req.body.ids } });
        return res.status(StatusCodes.NO_CONTENT).json({})
    }
    catch (error) {
        next(error);
    }
}
