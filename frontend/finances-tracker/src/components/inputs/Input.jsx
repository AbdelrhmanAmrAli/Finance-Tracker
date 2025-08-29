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
      <label htmlFor={id} className="block text-sm font-semibold text-primary mb-1 font-display">
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
          className="w-full rounded-xl border border-accent bg-bg-light py-2 pr-10 pl-3 text-sm text-gray-900 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none font-display transition-all"
          /* aria-* makes screen-readers happy when input toggles */
          aria-describedby={isPassword ? `${id}-toggle` : undefined}
        />

        {/* toggle icon (only for password) */}
        {isPassword && (
          <button
            id={`${id}-toggle`}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-accent hover:text-primary focus:outline-none"
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
