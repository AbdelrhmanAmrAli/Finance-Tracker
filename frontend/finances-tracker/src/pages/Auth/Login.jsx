import { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // Function to validate email format
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (!password) {
      setError("Password cannot be empty");
      return;
    }
    setError("");

    //login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const {token,user}=response.data;

      if (token) {
        localStorage.setItem("token", token); // Store token in local storage
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }

  };

  return (
    <AuthLayout>
      {/* Login page component for user authentication */}
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">welcome back </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          please enter your credentials
        </p>

        {/* Form for user login */}
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            label="Email Address"
            placeholder="AbdoAmr@example.com"
            type="email"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="********"
            type="password"
          />

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-400 transition-colors"
          >
            Login
          </button>

          <p className="text-xs text-slate-700 mt-4">
            Don't have an account?
            <span
              className="text-blue-500 cursor-pointer"
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
