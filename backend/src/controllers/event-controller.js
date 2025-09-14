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

const updateEvent = asyncHandler(async (req, res) => {
  const updatedEvent = await eventService.update(req.body, req.params.id);
  return res.status(200).json(updatedEvent);
});

const deleteEvent = asyncHandler(async (req, res) => {
  await eventService.deleteById(req.params.id);
  return res.status(204).json({ message: "Event deleted successfully." });
});

const bookEventTicket = asyncHandler(async (req, res) => {
  const { eventId, userId } = req.body;
  const bookedTicket = await eventService.bookTicket(eventId, userId);
  return res
    .status(201)
    .json({ message: "Booked ticket successfully.", ticket: bookedTicket });
});

const getUserBookedEvent = asyncHandler(async (req, res) => {
  const events = await eventService.findUserBookedEventByUserId(req.params.id);
  return res.status(200).json(events);
});
module.exports = {
  getEvents,
  getEventById,
  createEvent,
  deleteEvent,
  updateEvent,
  bookEventTicket,
  getUserBookedEvent
};
