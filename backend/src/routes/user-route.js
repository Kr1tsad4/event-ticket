const express = require("express");
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUserById
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUserById);


module.exports = router;