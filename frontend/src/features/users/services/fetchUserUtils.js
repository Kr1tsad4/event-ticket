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

const updateUser = async (id, user) => {
  try {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json(); 
    return { updatedUser: data, status: res.status };
  } catch (e) {
    throw new Error("Can not update user");
  }
};
export { getUsers, getUserById, updateUser };
