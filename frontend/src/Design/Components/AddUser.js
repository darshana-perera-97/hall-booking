import React, { useState } from "react";

const AddUser = () => {
  const [hotel, setHotel] = useState({
    HotelName: "",
    Location: "",
    stars: "",
    password: "",
    mainImage: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setHotel({ ...hotel, mainImage: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelData = {
      ...hotel,
      stars: parseInt(hotel.stars), // Convert stars to number
    };

    const formData = new FormData();
    formData.append("HotelName", hotelData.HotelName);
    formData.append("Location", hotelData.Location);
    formData.append("stars", hotelData.stars);
    formData.append("password", hotelData.password); // Add password
    formData.append("mainImage", hotelData.mainImage);

    try {
      const response = await fetch("http://localhost:5011/addHotels", {
        method: "POST",
        body: formData, // Send as FormData
      });

      if (!response.ok) {
        throw new Error("Failed to add hotel");
      }

      const result = await response.json();
      setMessage(result.message);
      setHotel({
        HotelName: "",
        Location: "",
        stars: "",
        password: "",
        mainImage: null,
      });
    } catch (error) {
      setMessage("Error adding hotel. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Add Hotel</h2>

            {message && (
              <div className="alert alert-success text-center">{message}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Hotel Name</label>
                <input
                  type="text"
                  name="HotelName"
                  className="form-control"
                  value={hotel.HotelName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Location</label>
                <input
                  type="text"
                  name="Location"
                  className="form-control"
                  value={hotel.Location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Stars (1-5)</label>
                <input
                  type="number"
                  name="stars"
                  className="form-control"
                  value={hotel.stars}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={hotel.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Main Image</label>
                <input
                  type="file"
                  name="mainImage"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Add Hotel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
