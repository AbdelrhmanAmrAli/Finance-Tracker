import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({
  id,
  value,
  onChange,
  label,
  placeholder = "",
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-1">
      {/* accessible label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        {/* input field */}
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={inputType}
          className="
            w-full rounded-md border border-gray-300 bg-transparent
            py-2 pr-10 pl-3 text-sm text-gray-900 shadow-sm
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none
            appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
          "
          /* aria-* makes screen-readers happy when input toggles */
          aria-describedby={isPassword ? `${id}-toggle` : undefined}
        />

        {/* toggle icon (only for password) */}
        {isPassword && (
          <button
            id={`${id}-toggle`}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaRegEye size={18} />
            ) : (
              <FaRegEyeSlash size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
