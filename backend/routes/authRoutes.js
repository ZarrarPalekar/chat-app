const { userRegister } = require("../controllers/authContollers");

const router = require("express").Router();

router.post("/user-register", userRegister);

module.exports = router;
