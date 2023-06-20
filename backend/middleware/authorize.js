const { StatusCodes } = require('http-status-codes');

exports.authorize = (...roles) => {
    return (req, res, next) => {
        console.log({roles, requestRole: req.role})
        if (!roles.includes(req.role)) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: `Authorization role as '${req.role}' is not valid! Correct roles are '${roles.join(", ")}' .` });
        }
        else {
            next();
        }
    };
};
