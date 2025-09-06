import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../utils/fetchAuthUtils";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
function VerifyEmail() {
  const [message, setMessage] = useState("Verifying...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get("token");

    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        setMessage(res.message || "Email verified successfully!");

        const signupUser = JSON.parse(localStorage.getItem("signup-user"));
        if (signupUser) {
          sessionStorage.setItem("login-user", JSON.stringify(signupUser));
          setUser(signupUser);
        }

        setTimeout(() => {
          navigate("/events");
        }, 1000);
      } catch (err) {
        setMessage(err.message);
      }
    };

    if (token) {
      verify();
    } else {
      setMessage("No token found");
    }
  }, [searchParams, navigate, setUser]);

  return (
    <div className="w-screen flex justify-center h-screen">
      <div className="text-2xl text-green-500 font-semibold">{message}</div>
    </div>
  );
}

export default VerifyEmail;
