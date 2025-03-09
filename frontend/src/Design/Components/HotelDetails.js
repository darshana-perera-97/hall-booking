import React, { useState, useEffect } from "react";
import EditHotelDetails from "./EditHotelDetails"; // Import EditHotelDetails
import AddPackage from "./AddPackage"; // Import AddPackage component

const HotelDetails = () => {
  const [hotel, setHotel] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null); // Track selected package
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [isAddPackageVisible, setIsAddPackageVisible] = useState(false); // Show AddPackage component in popup

  useEffect(() => {
    const hotelId = localStorage.getItem("HotelId");
    if (!hotelId) {
      setMessage("You are not logged in.");
      return;
    }

    fetch(`http://localhost:5011/getHotelDetails?HotelId=${hotelId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          setHotel(data);
        }
      })
      .catch((error) => {
        setMessage("Error fetching hotel details.");
        console.error(error);
      });
  }, []);

  // Function to toggle the editing mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Function to toggle the Add Package popup visibility
  const handleAddPackageClick = () => {
    setIsAddPackageVisible(true);
  };

  // Function to close the Add Package popup
  const closeAddPackagePopup = () => {
    setIsAddPackageVisible(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Hotel Details</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* If in editing mode, show EditHotelDetails */}
      {isEditing ? (
        <EditHotelDetails hotel={hotel} setIsEditing={setIsEditing} />
      ) : (
        hotel && (
          <div className="card shadow-lg p-4">
            <h4>Hotel Name: {hotel.HotelName}</h4>
            <p>
              <strong>Location:</strong> {hotel.Location}
            </p>
            <p>
              <strong>Stars:</strong> {hotel.stars}
            </p>

            <div>
              <strong>Main Image:</strong>
              {hotel.mainImage ? (
                <img
                  src={hotel.mainImage}
                  alt="Main"
                  className="img-fluid"
                  style={{ maxWidth: "300px", marginTop: "10px" }}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>

            {/* Display Available Packages */}
            {hotel.packages && hotel.packages.length > 0 && (
              <div className="mt-4">
                <h5>Available Packages:</h5>
                <ul className="list-group">
                  {hotel.packages.map((pkg, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedPackage(pkg)} // Show details when clicked
                    >
                      {pkg.packageName}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Show Selected Package Details */}
            {selectedPackage && (
              <div className="mt-4 card p-3">
                <h4>{selectedPackage.packageName}</h4>
                {selectedPackage.image && (
                  <img
                    src={selectedPackage.image}
                    alt={selectedPackage.packageName}
                    className="img-fluid mb-3"
                    style={{ maxWidth: "300px" }}
                  />
                )}
                <p>
                  <strong>About:</strong> {selectedPackage.about}
                </p>

                <h5>Contents:</h5>
                <ul className="list-group mb-3">
                  {selectedPackage.content.map((item, index) => (
                    <li key={index} className="list-group-item">
                      {item}
                    </li>
                  ))}
                </ul>

                <h5>Prices:</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPackage.prices.map((price, index) => (
                      <tr key={index}>
                        <td>{price.from}</td>
                        <td>{price.to}</td>
                        <td>${price.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedPackage(null)}
                >
                  Close Details
                </button>
              </div>
            )}

            {/* Add Edit Data button */}
            <button className="btn btn-warning mt-4" onClick={handleEditClick}>
              Edit Data
            </button>

            {/* Add Package button */}
            <button
              className="btn btn-primary mt-4"
              onClick={handleAddPackageClick}
            >
              Add Packages
            </button>
          </div>
        )
      )}

      {/* Add Package Popup */}
      {isAddPackageVisible && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Package</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeAddPackagePopup}
                />
              </div>
              <div className="modal-body">
                <AddPackage />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
