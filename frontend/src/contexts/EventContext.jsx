import { createContext, useState, useEffect, useContext } from "react";
import {
  createEvent,
  deleteEventById,
  getEvents,
  updateEvent,
} from "../utils/fetchEventUtils";
import socket from "../socket";
import { useCallback } from "react";
import { refreshToken } from "../utils/fetchAuthUtils";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getEvents();
      if (res) {
        const eventsWithDateTime = res.map((e) => {
          const plainDate = e.startDateTime.split("T")[0];
          const start = new Date(plainDate + "T00:00:00");
          const end = new Date(e.endDateTime);
          const date = start.toLocaleDateString("en-US", {
            timeZone: "Asia/Bangkok",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const time = `${start.toLocaleTimeString("en-US", {
            timeZone: "Asia/Bangkok",
            hour: "2-digit",
            minute: "2-digit",
          })} - ${end.toLocaleTimeString("en-US", {
            timeZone: "Asia/Bangkok",
            hour: "2-digit",
            minute: "2-digit",
          })}`;

          const ticketsAvailable = e.ticketCapacity - e.ticketBooked;
          const isSoldOut = e.ticketCapacity - e.ticketBooked <= 0;
          return {
            ...e,
            date,
            plainDate,
            time,
            ticketsAvailable,
            isSoldOut,
          };
        });
        setEvents(eventsWithDateTime);
      }
    } catch (err) {
      console.error("Fetch events error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addEvent = async (event, token) => {
    const res = await createEvent(event, token);
    if (res.status !== 201) {
      if (res.status === 401) {
        const refreshRes = await refreshToken();
        if (refreshRes.status === 200) {
          const newAccessToken = await refreshRes.newToken.json();
          sessionStorage.setItem("access_token", newAccessToken);
          const retryRes = await createEvent(event, newAccessToken);
          if (retryRes.status === 200) {
            fetchEvents();
          }
        }
      } else {
        console.error("Delete event failed:", res.status);
      }
      return;
    }
    fetchEvents();
  };
  const deleteEvent = async (id, token) => {
    const res = await deleteEventById(id, token);
    if (res !== 204) {
      if (res === 401) {
        const refreshRes = await refreshToken();
        if (refreshRes.status === 200) {
          const newAccessToken = await refreshRes.newToken.json();
          sessionStorage.setItem("access_token", newAccessToken);
          const retryRes = await deleteEventById(id, newAccessToken);
          if (retryRes.status === 200) {
            fetchEvents();
          }
        }
      } else {
        console.error("Delete event failed:", res);
      }
      return;
    }
    fetchEvents();
  };

  const editEvent = async (id, event, token) => {
    const res = await updateEvent(id, event, token);
    if (res.status !== 200) {
      if (res.status === 401) {
        const refreshRes = await refreshToken();
        if (refreshRes.status === 200) {
          const newAccessToken = await refreshRes.newToken.json();
          sessionStorage.setItem("access_token", newAccessToken);

          const retryRes = await updateEvent(
            id,
            event,
            newAccessToken.access_token
          );
          if (retryRes.status === 200) {
            fetchEvents();
          }
        }
      } else {
        console.error("Update event failed:", res.status);
      }
      return;
    }

    fetchEvents();
  };

  const bookTicket = async (eventId, userId, quantity) => {
    socket.emit("book", {
      eventId: eventId,
      userId: userId,
      quantity: quantity,
    });
  };

  useEffect(() => {
    const handleBookedTicket = () => {
      fetchEvents();
    };

    socket.on("booked-ticket", handleBookedTicket);
    return () => {
      socket.off("booked-ticket", handleBookedTicket);
    };
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <EventContext.Provider
      value={{
        events,
        fetchEvents,
        loading,
        deleteEvent,
        addEvent,
        editEvent,
        bookTicket,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
