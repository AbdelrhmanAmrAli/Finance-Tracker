import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/dashboard/Home";
import Income from "./pages/dashboard/Income";
import Expense from "./pages/dashboard/Expense";
import UserProvider from "./context/UserContext";
import{Toaster} from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <div>
        {/* Using BrowserRouter to handle routing in the application */}
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  //check if token is present in local storage
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  //redirect to dashboard page if authenticated otherwise redirect to login
  return (
    <div>
      {isAuthenticated ? (
        <Navigate to="/dashboard" />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
