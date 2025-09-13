const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
