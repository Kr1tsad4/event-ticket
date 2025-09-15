import { useState, useEffect, useCallback } from "react";
import {
  createEvent,
  deleteEventById,
  getEvents,
  getUserBookedEvent,
  updateEvent,
} from "@events/services/fetchEventUtils";
import socket from "../../../socket";
import { refreshToken } from "@auth/services/fetchAuthUtils";

export const useEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getEvents();
      if (res) {
        const eventsWithDateTime = res.map((e) => {
          const plainDate = e.startDateTime.split("T")[0];
          const start = new Date(e.startDateTime);
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
          const isSoldOut = ticketsAvailable <= 0;

          return { ...e, date, plainDate, time, ticketsAvailable, isSoldOut };
        });
        setEvents(eventsWithDateTime);
      }
    } catch (err) {
      console.error("Fetch events error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserBookedEvent = useCallback(async (userId) => {
    setLoading(true);
    try {
      const res = await getUserBookedEvent(userId);
      if (res) {
        const eventsWithDateTime = res.map((t) => {
          const plainDate = t.event.startDateTime.split("T")[0];
          const start = new Date(t.event.startDateTime);
          const end = new Date(t.event.endDateTime);

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

          return {
            ...t,
            event: { ...t.event, date, plainDate, time },
          };
        });
        return eventsWithDateTime;
      }
      return [];
    } catch (err) {
      console.error("Fetch user booked events error:", err.message);
      return [];
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
          if (retryRes.status === 200) fetchEvents();
        }
      } else console.error("Add event failed:", res.status);
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
          if (retryRes.status === 200) fetchEvents();
        }
      } else console.error("Delete event failed:", res);
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
          const retryRes = await updateEvent(id, event, newAccessToken);
          if (retryRes.status === 200) fetchEvents();
        }
      } else console.error("Update event failed:", res.status);
      return;
    }
    fetchEvents();
  };

  const bookTicket = async (eventId, userId, quantity) => {
    socket.emit("book", { eventId, userId, quantity });
  };

  useEffect(() => {
    const handleBookedTicket = () => fetchEvents();
    socket.on("booked-ticket", handleBookedTicket);
    return () => socket.off("booked-ticket", handleBookedTicket);
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    fetchEvents,
    fetchUserBookedEvent,
    addEvent,
    editEvent,
    deleteEvent,
    bookTicket,
  };
};
