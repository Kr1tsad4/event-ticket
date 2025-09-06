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

export { register, login, resendVerificationEmail,verifyEmail };
