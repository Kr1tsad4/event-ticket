const API_URL = import.meta.env.VITE_APP_URL;

const getEvents = async () => {
  try {
    const res = await fetch(`${API_URL}/events`);
    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error("Can not get events");
  }
};

const getEventById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/events/${id}`);
    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error("Can not get event");
  }
};
const createEvent = async (event, token) => {
  try {
    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Cannot create event");
    }

    const createdEvent = await res.json();
    return createdEvent;
  } catch (e) {
    throw new Error(`Cannot create event: ${e.message}`);
  }
};

const updateEvent = async (id, updateEvent, token) => {
  try {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...updateEvent,
      }),
    });
    const updatedEvent = await res.json();
    return updatedEvent;
  } catch (e) {
    throw new Error("can not update event");
  }
};

const deleteEventById = async (id, token) => {
  try {
    const data = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data.ok) {
      throw new Error(err.message || "Cannot delete event");
    }

    const res = await data.json();
    return res;
  } catch (e) {
    throw new Error(`Cannot delete event: ${e.message}`);
  }
};

export { getEvents, getEventById, deleteEventById, createEvent, updateEvent };
