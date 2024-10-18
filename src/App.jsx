import { React } from "react";
import './App.css';
import MapPage from "./mapPage/MapPage";
import { Routes, Route } from "react-router-dom";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import VisitedPubs from "./visitedPubs/VisitedPubs";
import UserReviews from "./reviews/userReviews/UserReviews";
import Menu from "./menu/Menu";

export default function App() {
  return (
    <div>
        <Menu />
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visitedPubs" element={<VisitedPubs />} />
        <Route path="/userReviews" element={<UserReviews />} />
      </Routes>
    </div>
  );
}