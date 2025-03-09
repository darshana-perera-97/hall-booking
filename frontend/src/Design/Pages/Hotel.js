import React, { useState } from "react";
import HotelLogin from "../Components/HotelLogin";
import HotelDetails from "../Components/HotelDetails";
import EditHotelDetails from "../Components/EditHotelDetails";
import AddPackage from "../Components/AddPackage";

export default function Hotel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Control edit mode

  return (
    <div>
      {!isLoggedIn ? (
        <HotelLogin onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : isEditing ? (
        <EditHotelDetails onUpdateSuccess={() => setIsEditing(false)} />
      ) : (
        <HotelDetails onEdit={() => setIsEditing(true)} />
      )}
      {/* <AddPackage /> */}
    </div>
  );
}
