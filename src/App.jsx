import { React } from "react";
import './App.css'
import StartPage from "./startPage/StartPage"
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
    </div>
  );
}