import { React } from "react";
import './App.css'
import StartPage from "./startPage/StartPage"
import { Routes, Route } from "react-router-dom";
import Register from "./auth/register/Register"

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}