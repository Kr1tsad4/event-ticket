const API_URL = import.meta.env.VITE_APP_URL;
const register = async (user) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...user,
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("can not register user");
  }
};
const login = async (user) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...user,
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("can not login");
  }
};

const logout = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", 
    });

    if (!res.ok) throw new Error("Logout failed");

    return await res.json(); 
  } catch (err) {
    throw new Error(err.message || "Cannot logout");
  }
};

const resendVerificationEmail = async (email) => {
  try {
    const res = await fetch(`${API_URL}/auth/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    });

    if (!res.ok) throw new Error("Resend verification failed");
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Cannot resend verification email");
  }
};

const verifyEmail = async (token) => {
  try {
    const res = await fetch(`${API_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!res.ok) throw new Error("Email verification failed");
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message || "Cannot verify email");
  }
};

const refreshToken = async () => {
  try {
    const refreshRes = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    return { newToken: refreshRes, status: refreshRes.status };
  } catch (err) {
    throw new Error("Failed to refresh token");
  }
};
export { register, login, resendVerificationEmail, verifyEmail, refreshToken ,logout};
