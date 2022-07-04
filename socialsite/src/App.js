import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home/Home";
import Accessibility from "@mui/icons-material/Accessibility";
import Profile from "./pages/profilePage/Profile";
import Login from "./pages/login/Login";
import { BrowserRouter, Navigate } from "react-router-dom";
import Register from "./pages/register/Register";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import { AuthContextProvider, AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate replace to="/" /> : <Register />}
          />
          <Route path="/profile/:username" element={<Profile />} />
          {/* // <Home />
      // <Profile />
      // <Login />
    <Register /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
