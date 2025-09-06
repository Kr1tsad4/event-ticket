import { createContext, useState, useEffect, useContext } from "react";
import {
  createEvent,
  deleteEventById,
  getEvents,
  updateEvent,
} from "../utils/fetchEventUtils";

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

          return {
            ...e,
            date,
            time,
            endDate,
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

  const addEvent = async (event, token) => {
    console.log(event);
    const createdEvent = await createEvent(event, token);
    if (createdEvent) {
      setEvents((prev) => [...prev, createdEvent]);
    }
    fetchEvents();
  };
  const deleteEvent = async (id, token) => {
    const deletedEvent = await deleteEventById(id, token);
    if (deletedEvent) {
      setEvents((prev) => prev.filter((e) => e._id !== id));
    }
  };

  const editEvent = async (id, event, token) => {
    const updatedEvent = await updateEvent(id, event, token);
    if (updatedEvent) {
      fetchEvents();
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{ events, fetchEvents, loading, deleteEvent, addEvent, editEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
