import { useState } from "react";
import InputField from "@components/InputField";
import { IoIosArrowRoundBack } from "react-icons/io";
function RegisterForm({
  userData,
  setUserData,
  signup,
  loading,
  switchForm,
  validateEmailField,
  emailError,
  setEmailError,
}) {
  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dobError, setDobError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [enterPasswordPage, setEnterPasswordPage] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const validateFullName = (value) => {
    if (!value.trim()) return "Full Name is required";
    if (value.trim().length < 3)
      return "Full Name must be at least 3 characters";
    return "";
  };

  const validatePhone = (value) => {
    const regex = /^[0-9]{9,15}$/;
    if (!value.trim()) return "Phone number is required";
    if (!regex.test(value)) return "Invalid phone number";
    return "";
  };

  const validateDob = (value) => {
    if (!value.trim()) return "Date of birth is required";
    const age = new Date().getFullYear() - new Date(value).getFullYear();
    if (age < 13) return "You must be at least 13 years old";
    return "";
  };

  const validatePasswordField = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8 || value.length > 16)
      return "Password must be 8-16 characters";
    return "";
  };

  const validateConfirmPasswordField = (value) => {
    if (!value) return "Confirm your password";
    if (value !== userData.password) return "Passwords do not match";
    return "";
  };

  const nextToPasswordPage = async () => {
    setEnterPasswordPage(true);
  };

  const enableNextButton = () => {
    return (
      !fullNameError &&
      !emailError &&
      !phoneError &&
      !dobError &&
      userData.fullName &&
      userData.email &&
      userData.phoneNumber &&
      userData.dob
    );
  };

  const enableButton = () => {
    return (
      !fullNameError &&
      !emailError &&
      !phoneError &&
      !dobError &&
      !passwordError &&
      !confirmPasswordError &&
      userData.password &&
      confirmPassword &&
      userData.fullName &&
      userData.email &&
      userData.phoneNumber &&
      userData.dob
    );
  };

  if (!enterPasswordPage) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-xl md:text-2xl font-semibold mb-5 text-center w-full">
          Create your account
        </h1>
        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={userData.fullName}
          handleInput={(val) => setUserData({ ...userData, fullName: val })}
          handleOnBlur={() =>
            setFullNameError(validateFullName(userData.fullName))
          }
          className="w-full"
        />
        {fullNameError && (
          <p className="text-red-500 w-full text-sm">{fullNameError}</p>
        )}

        <InputField
          label="Email"
          type="text"
          placeholder="Enter your email"
          value={userData.email}
          handleInput={(val) => setUserData({ ...userData, email: val })}
          handleOnBlur={() => setEmailError(validateEmailField(userData.email))}
          className="w-full"
        />
        {emailError && (
          <p className="text-red-500 w-full text-sm">{emailError}</p>
        )}

        <InputField
          label="Phone"
          type="text"
          placeholder="Enter your phone number"
          value={userData.phoneNumber}
          handleInput={(val) => setUserData({ ...userData, phoneNumber: val })}
          handleOnBlur={() =>
            setPhoneError(validatePhone(userData.phoneNumber))
          }
          className="w-full"
        />
        {phoneError && (
          <p className="text-red-500 w-full text-sm">{phoneError}</p>
        )}

        <InputField
          label="Date of Birth *"
          type="date"
          value={userData.dob}
          handleInput={(val) => setUserData({ ...userData, dob: val })}
          handleOnBlur={() => setDobError(validateDob(userData.dob))}
          className="w-full"
        />
        {dobError && <p className="text-red-500 w-full text-sm">{dobError}</p>}
        <p className="text-sm">
          Already have account ? {""}
          <span
            className="underline text-blue-500 cursor-pointer"
            onClick={() => switchForm()}
          >
            sign in
          </span>
        </p>
        <button
          className="btn btn-primary w-full mt-4"
          disabled={!enableNextButton()}
          onClick={() => nextToPasswordPage()}
        >
          Next
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className="text-[12px] font-semibold cursor-pointer"
          onClick={() => setEnterPasswordPage(false)}
        >
          <IoIosArrowRoundBack size={30} />
        </button>
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <h1 className="text-xl md:text-2xl font-semibold mb-5 text-center w-full">
            Create your password
          </h1>

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={userData.password}
            handleInput={(val) => setUserData({ ...userData, password: val })}
            handleOnBlur={() => {
              setPasswordError(validatePasswordField(userData.password));
            }}
            className="w-full"
          />
          {passwordError && (
            <p className="text-red-500 w-full text-sm">{passwordError}</p>
          )}

          <InputField
            label="Confirm password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            handleInput={(val) => setConfirmPassword(val)}
            handleOnBlur={() => {
              setPasswordError(validatePasswordField(userData.password));
              setConfirmPasswordError(
                validateConfirmPasswordField(confirmPassword)
              );
            }}
            className="w-full"
          />
          {confirmPasswordError && (
            <p className="text-red-500 w-full text-sm">
              {confirmPasswordError}
            </p>
          )}
          {emailError && (
            <p className="text-red-500 w-full text-sm">{emailError}</p>
          )}
          <div className="w-full mt-2">
            <button
              className="btn btn-primary w-full mt-4 rounded-full flex justify-center items-center"
              disabled={!enableButton() || loading}
              onClick={signup}
            >
              {loading ? (
                <div className="loader border-2 border-t-transparent border-white rounded-full w-5 h-5 animate-spin"></div>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
