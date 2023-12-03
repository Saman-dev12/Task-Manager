const { Login, Signup, Logout } = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/logout", Logout);

module.exports = router;
