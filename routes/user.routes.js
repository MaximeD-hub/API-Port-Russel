const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", auth, userController.getUsers);
router.get("/:email", auth, userController.getUserByEmail);
router.post("/", userController.createUser);
router.put("/:email", auth, userController.updateUser);
router.delete("/:email", auth, userController.deleteUser);

module.exports = router;
