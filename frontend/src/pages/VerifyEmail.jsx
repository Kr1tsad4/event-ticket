import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../utils/fetchAuthUtils";

function VerifyEmail() {
  const [message, setMessage] = useState("Verifying...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        setMessage(res.message || "Email verified successfully!");
        localStorage.setItem("email-verified", "true");
        setTimeout(() => {
          window.close();
        }, 3000);
      } catch (err) {
        setMessage(err.message);
      }
    };

    if (token) verify();
    else setMessage("No token found");
  }, [searchParams, navigate]);

  return (
    <div className="w-screen flex justify-center h-screen">
      <div className="text-2xl text-green-500 font-semibold">{message}</div>
    </div>
  );
}

export default VerifyEmail;
