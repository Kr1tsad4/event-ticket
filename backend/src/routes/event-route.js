const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const {
  getEvents,
  getEventById,
  createEvent,
  deleteEvent,
} = require("../controllers/event-controller");

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", authMiddleware, createEvent);
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
