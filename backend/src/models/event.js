const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price:{
      type:Number,
      required:true
    },
    ticketCapacity: {
      type: Number,
      required: true,
    },
    ticketBooked: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
