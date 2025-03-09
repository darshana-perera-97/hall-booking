import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link

export default function ViewHotel() {
  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5011/getAllHotels") // Fetch all hotels
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setMessage("No hotels available.");
        } else {
          setHotels(data);
        }
      })
      .catch((error) => {
        setMessage("Error fetching hotels.");
        console.error(error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Hotels</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}

      <div className="row">
        {hotels.map((hotel) => (
          <div key={hotel.HotelId} className="col-md-4 mb-4">
            <Link
              to={`/${hotel.HotelName.replace(/\s+/g, "-")}`}
              className="text-decoration-none"
            >
              <div className="card shadow-sm">
                {hotel.mainImage && (
                  <img
                    src={hotel.mainImage}
                    alt={hotel.HotelName}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{hotel.HotelName}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {hotel.Location}
                    <br />
                    <strong>Stars:</strong> {hotel.stars} ⭐
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
