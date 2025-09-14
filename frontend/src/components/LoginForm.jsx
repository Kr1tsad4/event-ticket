import InputField from "../components/InputField";

function LoginForm({
  userData,
  setUserData,
  loading,
  switchForm,
  signin,
  loginErrorMessage,
}) {
  const enableSigninButton = () => {
    return !!userData.email && !!userData.password;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-xl md:text-2xl font-semibold mb-5 text-center w-full">
        Welcome to Event ticket
      </h1>
      <InputField
        label="Email"
        type="text"
        placeholder="Enter your email"
        value={userData.email}
        handleInput={(val) => setUserData({ ...userData, email: val })}
        handleOnBlur={() => {}}
        className="w-full"
      />

      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        handleInput={(val) => setUserData({ ...userData, password: val })}
        handleOnBlur={() => {}}
        value={userData.password}
      />
      {loginErrorMessage && (
        <p className="text-red-500 w-full text-sm">{loginErrorMessage}</p>
      )}
      <div className="w-full mt-2">
        <p className="text-sm">
          Does not have an account ?{" "}
          <span
            className="underline text-blue-500 cursor-pointer"
            onClick={switchForm}
          >
            sign up
          </span>
        </p>

        <button
          className="btn btn-primary w-full mt-4 rounded-full flex justify-center items-center"
          disabled={!enableSigninButton()}
          onClick={() => signin()}
        >
          {loading ? (
            <div className="loader border-2 border-t-transparent border-white rounded-full w-5 h-5 animate-spin"></div>
          ) : (
            "Sign in"
          )}
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
