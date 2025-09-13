const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  bookEventTicket
} = require("../controllers/event-controller");

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/book-ticket", bookEventTicket);
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
