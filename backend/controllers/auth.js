const { StatusCodes } = require('http-status-codes');
const { User } = require("../models/User");
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
JWT_SECRET = process.env.JWT_SECRET
exports.login = async function (req, res, next) {
    try {
        const select = "+password";
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select(select);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: "Cannot find the user's email." });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: "Wrong password entered." });
        }
        user._id = user._id.toString();
        const accessToken = jwt.sign({ "userID": user._id, "role": user.role }, JWT_SECRET, {
            expiresIn: '1d'
        });
        return res.status(StatusCodes.OK)
            .json({ success: true, token: accessToken, user });
    }
    catch (error) {
        next(error);
    }
}