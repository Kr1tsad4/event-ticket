import { createContext, useState, useEffect, useContext } from "react";
import { deleteEventById, getEvents } from "../utils/fetchEventUtils";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await getEvents();
      if (res) {
        const eventsWithDateTime = res.map((e) => {
          const date = e.startDateTime.split("T")[0];
          const endDate = e.endDateTime.split("T")[0];
          const time = e.startDateTime.split("T")[1].slice(0, 5);
          const ticketsAvailable = e.ticketCapacity - e.ticketBooked;
          const end = Number(endDate.slice(8, 10)) - Number(date.slice(8, 10));
          const endIn = end > 0 ? end : "end";
          return {
            ...e,
            date,
            time,
            endIn,
            ticketsAvailable,
          };
        });
        setEvents(eventsWithDateTime);
      }
    } catch (err) {
      console.error("Fetch events error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id, token) => {
    console.log(token);
    const deletedEvent = await deleteEventById(id, token);
    if (deletedEvent) {
      setEvents((prev) => prev.filter((e) => e._id !== id));
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, fetchEvents, loading ,deleteEvent}}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
