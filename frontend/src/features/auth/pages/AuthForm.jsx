import { useState, useContext, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import {
  login,
  register,
  resendVerificationEmail,
} from "@auth/services/fetchAuthUtils";
import { AuthContext } from "@auth/stores/AuthContext";
import LoginForm from "@auth/components/LoginForm";
import RegisterForm from "@auth/components/RegisterForm";
import VerifyEmail from "@auth/components/VerifyEmail";

function AuthForm() {
  const navigator = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/login");
  const [isVerify, setIsVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [isResendVerificationEmail, setIsResendVerificationEmail] =
    useState(false);

  const { setUser, setToken } = useContext(AuthContext);

  const [emailError, setEmailError] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmailField = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return "Email is required";
    if (!regex.test(value)) return "Invalid email format";
    return "";
  };

  const switchForm = () => {
    setUserData({
      fullName: "",
      email: "",
      phoneNumber: "",
      dob: "",
      password: "",
    });
    setLoginErrorMessage("");
    navigator(isLoginPage ? "/register" : "/login");
  };

  const signin = async () => {
    setLoading(true);
    setLoginErrorMessage("");
    setUser(null);
    try {
      const res = await login(userData);
      if (!res.user) {
        throw new Error(res.message || "Login failed");
      }

      sessionStorage.setItem("login-user", JSON.stringify(res.user));
      sessionStorage.setItem("access_token", res["access_token"]);
      setUser(res.user);
      setToken(res["access_token"]);

      if (res.user.role === "admin") {
        navigator("/admin");
      } else {
        navigator("/events");
      }
    } catch (err) {
      const msg = err?.message || "Login failed";
      setLoginErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    setEmailError("");

    try {
      const newUser = await register(userData);
      console.log(newUser);
      if (newUser.message) {
        setEmailError(newUser.message);
        return;
      }
      if (newUser) {
        localStorage.setItem("signup-user", JSON.stringify(newUser));
        setIsVerify(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    const signUpUser = JSON.parse(sessionStorage.getItem("signup-user"));
    setResendLoading(true);
    try {
      await resendVerificationEmail({ email: signUpUser.email });
      setIsResendVerificationEmail(true);
    } catch (error) {
      setLoginErrorMessage(error.message || "Resend failed");
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    setIsVerify(false);
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 px-4 text-white">
      <div className="w-full max-w-md md:max-w-lg bg-black/70 flex flex-col justify-center gap-5 rounded-xl p-6 md:p-8">
        {isVerify && (
          <VerifyEmail
            isResendVerificationEmail={isResendVerificationEmail}
            resendVerification={resendVerification}
            resendLoading={resendLoading}
          />
        )}

        {isLoginPage && (
          <LoginForm
            userData={userData}
            setUserData={setUserData}
            switchForm={switchForm}
            signin={signin}
            loading={loading}
            loginErrorMessage={loginErrorMessage}
          />
        )}
        {!isLoginPage && !isVerify && (
          <RegisterForm
            userData={userData}
            setUserData={setUserData}
            switchForm={switchForm}
            signup={signup}
            loading={loading}
            validateEmailField={validateEmailField}
            emailError={emailError}
            setEmailError={setEmailError}
          />
        )}
      </div>
    </div>
  );
}

export default AuthForm;
