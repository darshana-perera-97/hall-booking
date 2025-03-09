import React, { useState, useEffect } from "react";

const EditHotelDetails = ({ hotel, setIsEditing }) => {
  const [hotelId] = useState(localStorage.getItem("HotelId"));
  const [hotelName, setHotelName] = useState(hotel?.HotelName || "");
  const [location, setLocation] = useState(hotel?.Location || "");
  const [password, setPassword] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(hotel?.mainImage || "");
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMainImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("HotelId", hotelId);
    formData.append("HotelName", hotelName);
    formData.append("Location", location);
    formData.append("password", password);
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    try {
      const response = await fetch("http://localhost:5011/editHotelDetails", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message || "Hotel details updated successfully.");
      setIsEditing(false); // Return to hotel details view after update
    } catch (error) {
      setMessage("Error updating hotel details.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Hotel Details</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Hotel Name</label>
          <input
            type="text"
            className="form-control"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Main Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
          {currentImage && (
            <div className="mt-2">
              <strong>Current Image:</strong>
              <img
                src={currentImage}
                alt="Main"
                className="img-fluid"
                style={{ maxWidth: "300px", marginTop: "10px" }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Details
        </button>
      </form>
    </div>
  );
};

export default EditHotelDetails;
