function InputField({ type, placeholder, label, value, handleInput, className }) {
  return (
    <div className={`w-full ${className || ""}`}>
      <label className="block mb-2 font-medium text-sm md:text-base">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full max-w-full bg-black md:max-w-[80vh] rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default InputField;
