const express = require('express');
const controller = require("../controllers/user");
const { Roles } = require("../helper/Roles");
const { authorize } = require("../middleware/authorize");
const { protect } = require("../middleware/protect");
const multer = require("../middleware/multer")
const router = express.Router();

router.post('/signup', controller.signup);

router.route('/user')
    .get(protect, controller.getUsers)
    .post(protect, authorize(Roles.SuperAdmin), multer.single("image"), controller.signup)

router
    .post("/user/delete", protect, authorize(Roles.SuperAdmin), controller.deleteUsers);

router.route('/user/:userId')
    .get(controller.getUser)
    .put(protect, authorize(Roles.SuperAdmin), multer.single("image"), controller.editUserById);



module.exports = router