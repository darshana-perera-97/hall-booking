import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddUser = () => {
  const [hotel, setHotel] = useState({
    HotelName: "",
    Location: "",
    stars: "",
    password: "",
    mainImage: null,
  });

  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control modal visibility

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
      setShowPopup(true); // Show popup on success

      // Reset form
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <h2 className="text-center mb-4 fw-bold text-primary">Add Hotel</h2>

          {message && (
            <div className="alert alert-success text-center rounded-pill py-2">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Hotel Name</label>
              <input
                type="text"
                name="HotelName"
                className="form-control rounded-pill px-3 py-2 border-primary shadow-sm"
                value={hotel.HotelName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Location</label>
              <input
                type="text"
                name="Location"
                className="form-control rounded-pill px-3 py-2 border-primary shadow-sm"
                value={hotel.Location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Stars (1-5)</label>
              <input
                type="number"
                name="stars"
                className="form-control rounded-pill px-3 py-2 border-primary shadow-sm"
                value={hotel.stars}
                onChange={handleChange}
                min="1"
                max="5"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control rounded-pill px-3 py-2 border-primary shadow-sm"
                value={hotel.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Main Image</label>
              <input
                type="file"
                name="mainImage"
                className="form-control rounded-pill px-3 py-2 border-primary shadow-sm"
                onChange={handleFileChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fw-bold shadow"
            >
              Add Hotel
            </button>
          </form>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-success">Success</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{message || "Hotel added successfully!"}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowPopup(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
