import React, { useState } from "react";

const AddPackage = () => {
  const [packageName, setPackageName] = useState("");
  const [image, setImage] = useState(null);
  const [about, setAbout] = useState("");
  const [content, setContent] = useState([]);
  const [prices, setPrices] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Store selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelId = localStorage.getItem("HotelId"); // Get hotelId from browser storage
    if (!hotelId) {
      alert("Hotel ID not found! Please login.");
      return;
    }

    const formData = new FormData();
    formData.append("packageName", packageName);
    formData.append("image", image);
    formData.append("about", about);
    formData.append("content", JSON.stringify(content));
    formData.append("prices", JSON.stringify(prices));

    try {
      const response = await fetch("http://localhost:5011/addPackages", {
        method: "POST",
        body: formData,
        headers: { hotelid: hotelId }, // Pass hotelId in request headers
      });

      if (response.ok) {
        const data = await response.json();
        setConfirmationMessage("Package added successfully!");
        console.log(data);
      } else {
        alert("Failed to add package");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Package</h2>
      {confirmationMessage && (
        <div className="alert alert-success">{confirmationMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Package Name</label>
          <input
            type="text"
            className="form-control"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Package Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">About</label>
          <textarea
            className="form-control"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setContent(e.target.value.split(","))}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Prices (Format: from,to,price | Separate multiple with ; )
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              const priceList = e.target.value.split(";").map((item) => {
                const [from, to, price] = item.split(",");
                return { from, to, price };
              });
              setPrices(priceList);
            }}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
