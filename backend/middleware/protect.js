const jwt = require('jsonwebtoken');
const { StatusCodes } = require( 'http-status-codes');

const JWT_SECRET = process.env.JWT_SECRET;

exports.protect = (req, res, next) => {
    const token = req.header('authorization');
    if (!token || String(token).trim() === "")     
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);  
        let { userID, role } = decoded;  
        req.userID = userID;
        req.role = role;
        next();
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'No token, authorization denied' });
    }
};

