import React from 'react'
import { BrowserRouter as Router ,Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/dashboard/Home'
import Income from './pages/dashboard/Income'
import Exspense from './pages/dashboard/Exspense'


const App = () => {
  return (
    <div>
      {/* Using BrowserRouter to handle routing in the application */}
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signUp" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Exspense />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App

const Root = () => {
  //check if token is present in local storage
  const isAuthenticated = localStorage.getItem('token') ? true : false;
  //redirect to dashboard page if authenticated otherwise redirect to login
  return (
    <div>
      {isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
    </div>
  )
}

