import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const Home = lazy(() => import("./pages/dashboard/Home"));
const Income = lazy(() => import("./pages/dashboard/Income"));
const Expense = lazy(() => import("./pages/dashboard/Expense"));
import UserProvider from "./context/UserContext";
import{Toaster} from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <div>
        {/* Using BrowserRouter to handle routing in the application */}
        <Router>
          <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signUp" exact element={<SignUp />} />
              <Route path="/dashboard" exact element={<Home />} />
              <Route path="/income" exact element={<Income />} />
              <Route path="/expense" exact element={<Expense />} />
            </Routes>
          </Suspense>
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
