const express = require("express");
const {
  getUsers,
  getUserById,
  deleteUserById
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);


module.exports = router;