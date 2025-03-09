// HotelLogin.js

import React, { useState } from "react";

const HotelLogin = () => {
  const [hotelId, setHotelId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "HotelId") {
      setHotelId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hotelId || !password) {
      setMessage("HotelId and password are required.");
      return;
    }

    const loginData = {
      HotelId: hotelId,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:5011/hotelLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the HotelId in localStorage if login is successful
        localStorage.setItem("HotelId", result.HotelId);
        setMessage("Login successful!");
      } else {
        setMessage(result.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Hotel Login</h2>

            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Hotel ID</label>
                <input
                  type="text"
                  name="HotelId"
                  className="form-control"
                  value={hotelId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelLogin;
