const eventService = require("../services/event-service");

const bookTicketHandler = (io, socket) => {
  socket.on("book", async ({ eventId, userId, quantity }) => {
    try {
      const bookedTicket = await eventService.bookTicket(
        eventId,
        userId,
        quantity
      );
      if (bookedTicket) {
        io.emit("booked-ticket");
      }
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = { bookTicketHandler };
