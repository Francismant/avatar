const router = require("express").Router();
const apiProfile = require("./profile");
const apiUsers = require("./users");

router.use("/profile", apiProfile);
router.use("/users", apiUsers);

module.exports = router;
