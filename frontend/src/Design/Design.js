import React from "react";
import SuperAdmin from "./Pages/SuperAdmin";
import Hotel from "./Pages/Hotel";
import ViewHotel from "./Pages/ViewHotel";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HotelPage from "./Pages/HotelPage";
import QuotePage from "./Pages/QuotePage";

export default function Design() {
  return (
    <div>
      {/* <SuperAdmin /> */}
      {/* <Hotel /> */}
      {/* <ViewHotel /> */}

      <Routes>
        <Route path="/" element={<ViewHotel />} />
        <Route path="/:hotelName" element={<HotelPage />} />
        <Route path="/quote/:packageName" component={QuotePage} />
      </Routes>
    </div>
  );
}
