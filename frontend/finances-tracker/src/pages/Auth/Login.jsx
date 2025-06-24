import { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { checkPassword, validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";
// Importing necessary hooks and components

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // useState for managing local state

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    //login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token); // Store token in local storage
        updateUser(user); // Update user context
        // Redirect to dashboard after successful login
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center lg:items-start lg:w-2/3 h-full px-4 sm:px-6 lg:px-0 mx-auto">
        <h3 className="text-xl lg:text-2xl font-semibold text-black">
          Welcome back
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 mt-1 mb-6">
          Please enter your credentials
        </p>

        <form onSubmit={handleLogin} className="w-full max-w-md">
          <Input
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            label="Email Address"
            placeholder="you@example.com"
            type="email"
            className="mb-4"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="••••••••"
            type="password"
            className="mb-4"
          />

          {error && (
            <p className="text-red-500 text-xs sm:text-sm mt-1 mb-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-2 hover:bg-blue-400 transition-colors text-sm sm:text-base"
          >
            Login
          </button>

          <p className="text-xs sm:text-sm text-slate-700 mt-4 text-center sm:text-left">
            Don't have an account?
            <span
              className="text-blue-500 ml-1 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
