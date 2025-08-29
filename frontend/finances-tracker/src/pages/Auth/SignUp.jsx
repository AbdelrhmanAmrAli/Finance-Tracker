import { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { checkPassword, validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Function to validate email format and handle sign-up logic
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Full name cannot be empty");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    const result = checkPassword(password);
    if (result) {
      setError(result);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullName,
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token); // Store token in local storage
        updateUser(user); // Update user context
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return (
    <div>
      {/* Sign-up page component for user registration */}
      <AuthLayout>
        <div className="flex flex-col justify-center w-full lg:max-w-lg px-6 sm:px-12 py-12 mx-auto font-display">
          <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Create an Account</h3>
          <p className="text-xs sm:text-sm text-accent mb-6">Please enter your details to sign up</p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Abdo Amr"
              type="text"
              value={fullName}
              onChange={({ target: { value } }) => setFullName(value)}
            />
            <Input
              label="Email Address"
              placeholder="AbdoAmr@example.com"
              type="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
            />
            <Input
              label="Password"
              placeholder="********"
              type="password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
            <Input
              label="Confirm Password"
              placeholder="********"
              type="password"
              value={confirmPassword}
              onChange={({ target: { value } }) => setConfirmPassword(value)}
            />

            {error && (
              <p className="text-danger text-xs sm:text-sm mt-1 font-semibold">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-xl mt-2 hover:bg-primary/90 transition-colors text-base font-bold shadow"
            >
              Sign Up
            </button>

            <p className="text-xs sm:text-sm text-accent mt-4 text-center">
              Already have an account?
              <span
                className="text-primary ml-1 cursor-pointer font-semibold"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
