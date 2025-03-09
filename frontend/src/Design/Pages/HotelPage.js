import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const HotelPage = () => {
  const { hotelName } = useParams(); // Get hotel name from URL
  const [hotel, setHotel] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false); // State to toggle quote form visibility

  useEffect(() => {
    const hotelName = window.location.pathname.split("/").pop(); // Get hotel name from the URL

    if (!hotelName) {
      setMessage("Hotel Name is missing");
      return;
    }

    fetch(`http://localhost:5011/getHotelByName?HotelName=${hotelName}`)
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

  // Handle the selection of a package and show the quote form
  const handleGetQuote = (pkg) => {
    setSelectedPackage(pkg);
    setShowQuoteForm(true);
  };

  // Close the quote form
  const handleCloseQuoteForm = () => {
    setShowQuoteForm(false);
    setSelectedPackage(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Hotel Details</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      {hotel && (
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
                src={`http://localhost:5011/${hotel.mainImage}`}
                alt="Main"
                className="img-fluid"
                style={{ maxWidth: "300px", marginTop: "10px" }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>

          {/* Show Available Packages */}
          {hotel.packages && hotel.packages.length > 0 && (
            <>
              <h4 className="mt-4">Available Packages</h4>
              <div className="row">
                {hotel.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="col-md-4"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card mb-3 shadow-sm">
                      <img
                        src={`http://localhost:5011/${pkg.image}`}
                        className="card-img-top"
                        alt={pkg.packageName}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">{pkg.packageName}</h5>
                        {/* Add Get Quote Button */}
                        <button
                          className="btn btn-primary"
                          onClick={() => handleGetQuote(pkg)}
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Show Package Details in the Same Page When Selected */}
      {showQuoteForm && selectedPackage && (
        <div className="mt-4 p-4 border rounded shadow-lg">
          <h3>{selectedPackage.packageName}</h3>
          <img
            src={`http://localhost:5011/${selectedPackage.image}`}
            alt={selectedPackage.packageName}
            className="img-fluid"
            style={{ maxWidth: "300px", marginBottom: "10px" }}
          />
          <p>
            <strong>About:</strong> {selectedPackage.about}
          </p>
          <h5>Contents:</h5>
          <ul>
            {selectedPackage.content.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <h5>Pricing:</h5>
          <ul>
            {selectedPackage.prices.map((price, idx) => (
              <li key={idx}>
                {price.from} - {price.to}: ${price.price}
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary" onClick={handleCloseQuoteForm}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelPage;
