import { useEffect } from "react";
import { useState } from "react";

function BookingConfirmationModal({
  eventTicketToBook,
  setEventTicketToBook,
  confirmBookTicket,
}) {
  if (!eventTicketToBook) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (start, end) => {
    return `${new Date(start).toLocaleTimeString("en-US", {
      timeZone: "Asia/Bangkok",
      hour: "2-digit",
      minute: "2-digit",
    })} - ${new Date(end).toLocaleTimeString("en-US", {
      timeZone: "Asia/Bangkok",
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(eventTicketToBook.price);

  useEffect(() => {
    setTotal(quantity * eventTicketToBook.price);
  }, [quantity, eventTicketToBook.price]);

  return (
    <div className="bg-white rounded-xl w-[500px] h-auto shadow-lg overflow-hidden">
      <div className="w-full h-48 bg-gray-500"></div>

      <div className="p-6 text-black space-y-4">
        <h1 className="text-2xl font-bold">{eventTicketToBook.title}</h1>
        <p className="text-gray-600">{eventTicketToBook.description}</p>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Location:</span>
            <span>{eventTicketToBook.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Date:</span>
            <span>{formatDate(eventTicketToBook.startDateTime)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Time:</span>
            <span>
              <span>
                {formatTime(
                  eventTicketToBook.startDateTime,
                  eventTicketToBook.endDateTime
                )}
              </span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Price:</span>
            <span>{eventTicketToBook.price.toLocaleString()} ฿</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Available Tickets :</span>
            <span>
              {eventTicketToBook.ticketCapacity -
                eventTicketToBook.ticketBooked}{" "}
              / {eventTicketToBook.ticketCapacity}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="font-semibold">Number of Tickets:</span>
            <input
              type="number"
              min={1}
              max={
                eventTicketToBook.ticketCapacity -
                eventTicketToBook.ticketBooked
              }
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-2 py-1 w-20"
            />
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="font-semibold">Total:</span>
            <span>{total.toLocaleString()} ฿</span>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button
            onClick={() => setEventTicketToBook(null)}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 cursor-pointer font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => confirmBookTicket(eventTicketToBook._id,quantity)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer font-semibold"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmationModal;
