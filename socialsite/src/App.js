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
import Modal from "./components/modals/Modal";

function App() {
  const { user, modalType } = useContext(AuthContext);
  let storedUser = localStorage.getItem("user");
  let currentUser;
  storedUser ? (currentUser = JSON.parse(storedUser)) : (currentUser = user);

  return (
    <div className="wrapper">
      {modalType&&<Modal type={modalType} />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={currentUser === null ? <Login /> : <Home />}
          />
          <Route
            path="/login"
            element={currentUser ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={currentUser ? <Navigate replace to="/" /> : <Register />}
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
