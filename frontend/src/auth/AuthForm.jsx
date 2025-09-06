import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { useNavigate, useLocation } from "react-router-dom";
import {
  login,
  register,
  resendVerificationEmail,
} from "../utils/fetchAuthUtils";
function AuthForm() {
  const navigator = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerify, setIsVerify] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isResendVerificationEmail, setIsResendVerificationEmail] =
    useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const userData = {
    fullName: fullName,
    email: email,
    password: password,
  };

  const enableButton = () => {
    return isLoginPage
      ? !!email?.trim() && !!password
      : !!fullName?.trim() && !!email?.trim() && !!password;
  };

  const switchForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    navigator(isLoginPage ? "/register" : "/login");
  };

  const signup = async () => {
    setLoading(true);

    try {
      const newUser = await register(userData);
      if (newUser.message) {
        setEmailErrorMessage(newUser.message);
        return;
      }
      if (newUser) {
        setIsVerify(false);
        sessionStorage.setItem("signup-user", JSON.stringify(newUser));
      }
    } catch (err) {
      console.error("Register error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const signin = async () => {
    setLoading(true);
    try {
      const res = await login(userData);
      if (!res.user.isVerified) {
        setIsVerify(false);
        return;
      }
      sessionStorage.setItem("login-user", JSON.stringify(res.user));
      console.log("in");
      navigator("/home");
    } catch (err) {
      console.error("Login error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    const signUpUser = JSON.parse(sessionStorage.getItem("signup-user"));
    setResendLoading(true);
    try {
      const res = await resendVerificationEmail({ email: signUpUser.email });
      setIsResendVerificationEmail(true);
      console.log("Verification email resent:", res.message);
    } catch (error) {
      console.error("Resend error:", error.message);
    } finally {
      setResendLoading(false);
    }
  };
  useEffect(() => {
    const checkVerified = () => {
      const verified = localStorage.getItem("email-verified");
      if (verified === "true") {
        localStorage.removeItem("email-verified");
        setTimeout(() => {
          navigator("/home");
        }, 3000);
      }
    };

    checkVerified();
    window.addEventListener("storage", checkVerified);
    return () => {
      window.removeEventListener("storage", checkVerified);
    };
  }, [navigator]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md md:max-w-lg bg-black/70 flex flex-col justify-center gap-5 rounded-xl p-6 md:p-8">
        {!isVerify && (
          <div className="flex flex-col items-center">
            <h1 className="text-xl md:text-2xl font-semibold mb-5 text-center">
              {isResendVerificationEmail
                ? "Verification email resent"
                : "Please check your email to verify"}
            </h1>
            <button
              onClick={resendVerification}
              className="btn btn-primary w-full mt-2 flex justify-center items-center"
              disabled={isResendVerificationEmail || resendLoading}
            >
              {resendLoading ? (
                <div className="loader border-2 border-t-transparent border-white rounded-full w-5 h-5 animate-spin"></div>
              ) : isResendVerificationEmail ? (
                "Verification email resent"
              ) : (
                "Resend"
              )}
            </button>
          </div>
        )}

        {isVerify && (
          <div className="flex flex-col gap-4 justify-center items-center w-full">
            <h1 className="text-xl md:text-2xl font-semibold mb-5 text-center w-full">
              {isLoginPage ? "Welcome to Event ticket" : "Create your account"}
            </h1>

            {!isLoginPage && (
              <InputField
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                handleInput={(e) => setFullName(e)}
                className="w-full"
              />
            )}

            <InputField
              label="Email"
              type="text"
              placeholder="Enter your email"
              value={email}
              handleInput={(e) => setEmail(e)}
              className="w-full"
            />
            {emailErrorMessage && (
              <p className="text-red-500 w-full text-sm">{emailErrorMessage}</p>
            )}

            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              handleInput={(e) => setPassword(e)}
              className="w-full"
            />

            <div className="w-full mt-2 ">
              <p className="text-sm">
                {isLoginPage
                  ? "Does not have an account ?"
                  : "Already have account ? "}
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => switchForm()}
                >
                  {isLoginPage ? "sign up" : "sign in"}
                </span>
              </p>

              <button
                className="btn btn-primary w-full mt-4 rounded-full flex justify-center items-center"
                disabled={!enableButton() || loading}
                onClick={() => (isLoginPage ? signin() : signup())}
              >
                {loading ? (
                  <div className="loader border-2 border-t-transparent border-white rounded-full w-5 h-5 animate-spin"></div>
                ) : isLoginPage ? (
                  "Sign in"
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
