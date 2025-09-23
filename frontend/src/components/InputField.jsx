function InputField({
  type,
  placeholder,
  label,
  value,
  handleInput,
  handleOnBlur,
  className,
  labelTextColor = "white",
  labelText = "sm",
  outlineColor = "black",
  textColor = "black",
}) {
  const textSizes = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
  };

  const textColors = {
    white: "text-white",
    "blue-500": "text-blue-500",
    black: "text-black",
  };

  const outlineColors = {
    black: "outline-black",
    "blue-500": "outline-blue-500",
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <label
        className={`block mb-2 font-medium ${textSizes[labelText]} ${textColors[labelTextColor]}`}
      >
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInput && handleInput(e.target.value)}
        onBlur={(e) => handleOnBlur && handleOnBlur(e.target.value)}
        className={`w-full max-w-full bg-white/50  ${textColors[textColor]} md:max-w-[80vh] rounded-full px-4 py-2 outline-1 ${outlineColors[outlineColor]} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
      />
    </div>
  );
}

export default InputField;
