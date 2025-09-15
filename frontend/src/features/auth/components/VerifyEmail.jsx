function VerifyEmail({
  isResendVerificationEmail,
  resendVerification,
  resendLoading,
}) {
  return (
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
  );
}

export default VerifyEmail;
