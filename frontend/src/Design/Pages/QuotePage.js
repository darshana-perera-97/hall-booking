import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";

const QuotePage = () => {
  const location = useLocation();
  const { package: selectedPackage } = location.state || {};

  // Check if the selectedPackage exists
  if (!selectedPackage) {
    return <div className="alert alert-danger">No package selected.</div>;
  }

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Package Quote Details", 20, 20);

    // Package Name
    doc.setFontSize(14);
    doc.text(`Package Name: ${selectedPackage.packageName}`, 20, 30);

    // About the Package
    doc.setFontSize(12);
    doc.text(`About: ${selectedPackage.about}`, 20, 40);

    // Contents
    doc.setFontSize(12);
    doc.text("Contents:", 20, 50);
    selectedPackage.content.forEach((item, index) => {
      doc.text(`- ${item}`, 20, 60 + index * 10);
    });

    // Pricing
    doc.setFontSize(12);
    doc.text("Pricing:", 20, 80 + selectedPackage.content.length * 10);
    selectedPackage.prices.forEach((price, index) => {
      doc.text(
        `${price.from} - ${price.to}: $${price.price}`,
        20,
        90 + index * 10 + selectedPackage.content.length * 10
      );
    });

    // Save the PDF
    doc.save("quotation.pdf");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Package Quote Details</h2>
      <div className="card shadow-lg p-4">
        <h3>{selectedPackage.packageName}</h3>
        <img
          src={selectedPackage.image}
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

      {/* Floating button for download */}
      <button
        onClick={generatePDF}
        className="btn btn-primary btn-lg rounded-circle"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          width: "60px",
          height: "60px",
        }}
      >
        <i className="bi bi-download"></i>{" "}
        {/* Bootstrap Icons for download icon */}
      </button>
    </div>
  );
};

export default QuotePage;
