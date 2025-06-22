import { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";

const signUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Function to validate email format
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
    if (!password) {
      setError("Password cannot be empty");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    // Here you would typically handle the sign-up logic, such as making an API call
    // For now, we'll just navigate to the login page
    navigate("/login");
  };
  return (
    <div>
      <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center ">
          <h3 className="text-xl font-semibold text-black">
            Create an Account
          </h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Please enter your details to sign up
          </p>

          <form onSubmit={handleSignUp}>
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

            <button
              type="submit"
              className="w-full bg-violet-500 text-white py-2 rounded-md mt-4 hover:bg-violet-400 transition-colors"
            >
              Sign Up
            </button>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <p className="text-xs text-slate-700 mt-4">
              Already have an account?
              <span
                className="text-violet-500 cursor-pointer"
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

export default signUp;
