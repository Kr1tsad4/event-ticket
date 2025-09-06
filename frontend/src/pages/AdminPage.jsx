import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import NavigationBar from "../components/NavigationBar";
import { useEvents } from "../contexts/EventContext";
function AdminPage() {
  const { user, token } = useContext(AuthContext);
  const { events, loading, deleteEvent } = useEvents();
  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div>
      <NavigationBar />
      Home {user.role}
      <div className="m-10">
        <h1 className="text-2xl font-bold mb-5">Event Management</h1>
        <button className="btn btn-primary py-1 mb-5">Add Event</button>
        <table className="table-auto border-collapse border font-semibold border-gray-200 w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className=" px-2 py-3">Title</th>
              <th className=" px-2 py-2">Location</th>
              <th className=" px-2 py-2">Date</th>
              <th className=" px-2 py-2">Time</th>
              <th className=" px-2 py-2">Tickets</th>
              <th className=" px-2 py-2">Ticket Booked</th>
              <th className=" px-2 py-2">Ticket Available</th>
              <th className=" px-2 py-2">End in</th>
              <th className=" px-2 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event._id}>
                  <td className="px-2 py-2">{event.title}</td>
                  <td className="px-2 py-2">{event.location}</td>
                  <td className="px-2 py-2">{event.date}</td>
                  <td className="px-2 py-2">{event.time}</td>
                  <td className="px-2 py-2">{event.ticketCapacity}</td>
                  <td className="px-2 py-2">{event.ticketBooked}</td>
                  <td className="px-2 py-2">{event.ticketsAvailable}</td>
                  <td
                    className={`"px-2 py-2" ${
                      Number(event.endIn) < 2 || !Number(event.endIn)
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {Number(event.endIn)
                      ? `${event.endIn} d`
                      : `${event.endIn}`}
                  </td>
                  <td className="px-2 py-2">
                    <button className="btn btn-sm btn-primary mr-2">
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => deleteEvent(event._id, token)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-5">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
