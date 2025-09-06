const asyncHandler = require("express-async-handler");
const eventService = require("../services/event-service");

const getEvents = asyncHandler(async (req, res) => {
  const events = await eventService.findAll();
  return res.status(200).json(events);
});

const getEventById = asyncHandler(async (req, res) => {
  const event = await eventService.findById(req.params.id);
  return res.status(200).json(event);
});

const createEvent = asyncHandler(async (req, res) => {
  const newEvent = await eventService.create(req.body);
  return res.status(201).json(newEvent);
});

const deleteEvent = asyncHandler(async (req, res) => {
  await eventService.deleteById(req.params.id);
  return res.status(204).json({ message: "Event deleted successfully." });
});

module.exports = { getEvents, getEventById, createEvent, deleteEvent };
