const Event = require("../models/event");
const createError = require("http-errors");
const Ticket = require("../models/ticket");
const User = require("../models/user");

const findAll = async () => {
  return await Event.find().select("-__v");
};

const findById = async (id) => {
  const existingEvent = await Event.findById(id).select("-__v");
  if (!existingEvent) {
    throw createError(404, `Event not found with id ${id}`);
  }
  return existingEvent;
};

const create = async (event) => {
  const newEvent = await Event.create(event);
  const newEventObj = newEvent.toObject();
  delete newEventObj.__v;
  return newEventObj;
};

const update = async (event, id) => {
  const existingEvent = await Event.findById(id);
  if (!existingEvent) {
    throw createError(404, `Event not found with id ${id}`);
  }
  const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
  return updatedEvent;
};
const deleteById = async (id) => {
  const existingEvent = await Event.findById(id);
  if (!existingEvent) {
    throw createError(404, `Event not found with id ${id}`);
  }
  await Event.deleteOne(existingEvent._id);
};

const bookTicket = async (eventId, userId, quantity = 1) => {
  const event = await Event.findById(eventId);
  if (!event) throw createError(404, `Event not found with id ${eventId}`);

  const user = await User.findById(userId);
  if (!user) throw createError(404, `User not found with id ${userId}`);

  const availableTickets = event.ticketCapacity - event.ticketBooked;
  if (availableTickets < quantity) {
    throw createError(
      400,
      `Only ${availableTickets} tickets available for this event`
    );
  }

  const ticket = await Ticket.create({
    event: event._id,
    bookedBy: user._id,
    quantity,
  });

  if (!user.bookedTickets.includes(ticket._id)) {
    user.bookedTickets.push(ticket._id);
  }

  event.ticketBooked += quantity;

  await Promise.all([user.save(), event.save()]);

  return ticket;
};

module.exports = { findAll, findById, create, deleteById, update, bookTicket };
