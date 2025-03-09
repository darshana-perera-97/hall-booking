import React from "react";
import SuperAdmin from "./Pages/SuperAdmin";
import Hotel from "./Pages/Hotel";
import ViewHotel from "./Pages/ViewHotel";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HotelPage from "./Pages/HotelPage";
import QuotePage from "./Pages/QuotePage";
import Navbar from "./Components/Navbar";

export default function Design() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/SuperAdmin" element={<SuperAdmin />} />
        <Route path="/" element={<ViewHotel />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/:hotelName" element={<HotelPage />} />
        <Route path="/quote" element={<QuotePage />} />
      </Routes>
    </div>
  );
}
