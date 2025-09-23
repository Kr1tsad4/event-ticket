import { useContext } from "react";
import { AuthContext } from "@auth/stores/AuthContext";

function TicketCard({ userBookedEvent = []}) {
  const { user } = useContext(AuthContext);

  if (!userBookedEvent) {
    return <p className="m-8 text-gray-500">No tickets found.</p>;
  }
  return (
    <div className="grid grid-cols-3 gap-3">
      {userBookedEvent.map((ticket, index) => (
        <div
          key={ticket._id || index}
          className="p-4 border border-gray-300 rounded-xl shadow-sm flex justify-between"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-bold pb-1">{ticket.event.title}</h1>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[16px]">Name: </span> {user.fullName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Date: </span> {ticket.event.date}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Location: </span>
              {ticket.event.location}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Time: </span>
              {ticket.event.time}
            </p>
          </div>
          <div className="flex items-end">
            <p className="font-bold">x {ticket.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketCard;
