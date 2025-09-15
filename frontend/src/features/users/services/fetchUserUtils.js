const API_URL = import.meta.env.VITE_APP_URL;

const getUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error("Can not get users");
  }
};

const getUserById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/users/${id}`);
    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error("Can not get user");
  }
};

export {getUsers,getUserById}