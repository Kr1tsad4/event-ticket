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

const getUserBookedEvent = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/events/user/${userId}`);
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

    const createdEvent = await res.json();
    return { createdEvent, status: res.status };
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
      body: JSON.stringify(updateEvent),
    });

    const updatedEvent = await res.json();
    return { updatedEvent, status: res.status };
  } catch (e) {
    throw new Error(`Cannot update event: ${e.message}`);
  }
};

const deleteEventById = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.status;
  } catch (e) {
    throw new Error(`Cannot delete event: ${e.message}`);
  }
};

export {
  getEvents,
  getEventById,
  deleteEventById,
  createEvent,
  updateEvent,
  getUserBookedEvent,
};
