import React from "react";
import { useLocation } from "react-router-dom";

const QuotePage = () => {
  const location = useLocation();
  const { package: selectedPackage } = location.state || {};

  if (!selectedPackage) {
    return <div className="alert alert-danger">No package selected.</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Package Quote Details</h2>
      <div className="card shadow-lg p-4">
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
      </div>
    </div>
  );
};

export default QuotePage;
