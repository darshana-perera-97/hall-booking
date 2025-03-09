import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const HotelPage = () => {
  const { hotelName } = useParams();
  const [hotel, setHotel] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
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
  }, [hotelName]);

  const handleGetQuote = (pkg) => {
    setSelectedPackage(pkg);
    setShowQuoteForm(true);
  };

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
                src={hotel.mainImage} // No need to prefix with localhost
                alt={hotel.HotelName}
                className="img-fluid"
                style={{ maxWidth: "300px", marginTop: "10px" }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>

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
                      {pkg.image && (
                        <img
                          src={pkg.image} // No need to prefix with localhost
                          className="card-img-top"
                          alt={pkg.packageName}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      )}
                      <div className="card-body text-center">
                        <h5 className="card-title">{pkg.packageName}</h5>
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

      {showQuoteForm && selectedPackage && (
        <div className="mt-4 p-4 border rounded shadow-lg">
          <h3>{selectedPackage.packageName}</h3>
          {selectedPackage.image && (
            <img
              src={selectedPackage.image} // No need to prefix with localhost
              alt={selectedPackage.packageName}
              className="img-fluid"
              style={{ maxWidth: "300px", marginBottom: "10px" }}
            />
          )}
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
