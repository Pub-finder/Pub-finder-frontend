import { React } from "react";
import './App.css';
import StartPage from "./startPage/StartPage";
import { Routes, Route } from "react-router-dom";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import VisitedPubs from "./visitedPubs/VisitedPubs";
import Menu from "./menu/Menu";

export default function App() {
  return (
    <div>
        <Menu />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visitedPubs" element={<VisitedPubs />} />
      </Routes>
    </div>
  );
}