const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5011;
const DATA_FILE = "data.json";

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// Function to read hotels data from file
const readHotels = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to write hotels data to file
const writeHotels = (hotels) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(hotels, null, 2), "utf8");
};

// GET route to check API status
app.get("/", (req, res) => {
  res.json({ message: "Hello from Node.js API on port 5011!" });
});

// POST route to add a new hotel
app.post("/addHotels", (req, res) => {
  const { HotelName, Location, mainImage, stars, packages } = req.body;

  if (
    !HotelName ||
    !Location ||
    !mainImage ||
    !stars ||
    !Array.isArray(packages)
  ) {
    return res
      .status(400)
      .json({ error: "Invalid request. Check input fields." });
  }

  let hotels = readHotels();
  const newHotel = {
    HotelId: hotels.length > 0 ? hotels[hotels.length - 1].HotelId + 1 : 1,
    HotelName,
    Location,
    mainImage,
    stars,
    packages,
  };

  hotels.push(newHotel);
  writeHotels(hotels);

  res.json({ message: "Hotel added successfully!", hotel: newHotel });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
