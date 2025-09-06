const Event = require("../models/event");
const createError = require("http-errors");

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

module.exports = { findAll, findById, create, deleteById,update };
