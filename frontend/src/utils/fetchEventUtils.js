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

export { getEvents,deleteEventById };
