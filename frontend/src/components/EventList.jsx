function EventList({ events, views }) {
  if (events.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No events found matching your search or filters.
      </div>
    );
  }
  return (
    <div>
      {events.map((event) => (
        <div key={event._id}>
          {views === "list" && (
            <div className="border border-gray-300 shadow p-5 mb-5 flex justify-between items-center rounded-xl">
              <div>
                <h1 className="text-2xl font-bold pb-2">{event.title}</h1>
                <p className="text-sm text-gray-600">
                  {event.date} <span className="mx-2">·</span> {event.location}
                </p>
                <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Available Tickets: {event.ticketsAvailable}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Price: {event.price} ฿
                </p>
              </div>
              <div>
                <button className="btn btn-primary rounded-xl px-6">
                  Book Ticket
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default EventList;
