import React from "react";
import HotelLogin from "../Components/HotelLogin";
import EditHotelDetails from "../Components/EditHotelDetails";
import HotelDetails from "../Components/HotelDetails";
import AddPackage from "../Components/AddPackage";

export default function Hotel() {
  return (
    <div>
      <HotelLogin />
      <EditHotelDetails />
      <HotelDetails />
      <AddPackage />
    </div>
  );
}
