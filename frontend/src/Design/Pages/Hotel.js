import React, { useState } from "react";
import HotelLogin from "../Components/HotelLogin";
import HotelDetails from "../Components/HotelDetails";
import EditHotelDetails from "../Components/EditHotelDetails";
// import AddPackage from "../Components/AddPackage"; // Uncomment when needed

export default function Hotel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Control edit mode

  return (
    <div>
      {/* Show HotelLogin if the user is NOT logged in */}
      {!isLoggedIn && <HotelLogin onLoginSuccess={() => setIsLoggedIn(true)} />}

      {/* Once logged in, show HotelDetails or EditHotelDetails */}
      {isLoggedIn &&
        (isEditing ? (
          <EditHotelDetails onUpdateSuccess={() => setIsEditing(false)} />
        ) : (
          <HotelDetails onEdit={() => setIsEditing(true)} />
        ))}

      {/* Uncomment when adding package functionality */}
      {/* {isLoggedIn && <AddPackage />} */}
    </div>
  );
}
