const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5011;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

app.use(express.static("uploads")); // To serve uploaded images

const DATA_FILE = "data.json";

// Setup multer storage to save uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save the image to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique name for the file
  },
});

const upload = multer({ storage });

// Function to read existing hotels from JSON file
const readHotels = () => {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch (error) {
    return []; // Return empty array if file doesn't exist or error occurs
  }
};

// Function to write hotels data to JSON file
const writeHotels = (hotels) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(hotels, null, 2));
};

// In your /addHotels API
app.post("/addHotels", upload.single("mainImage"), (req, res) => {
  let { HotelName, Location, stars, password } = req.body;
  let mainImage = "";

  // If a new image is uploaded, update the mainImage URL
  if (req.file) {
    mainImage = `http://localhost:5011/${req.file.filename}`; // Return full image URL
  }

  const hotel = {
    HotelId: hotels.length + 1, // Incremental HotelId
    HotelName,
    Location,
    mainImage,
    stars,
    password, // Adding password to hotel data
    packages: [], // Empty array for packages
  };

  hotels.push(hotel);
  saveHotelsData();
  res.status(201).json(hotel); // Send the newly created hotel back to the client
});

// API to login a hotel (check HotelId and password)
app.post("/hotelLogin", (req, res) => {
  const { HotelId, password } = req.body;

  if (!HotelId || !password) {
    return res
      .status(400)
      .json({ message: "HotelId and password are required." });
  }

  const hotels = readHotels();
  const hotel = hotels.find((h) => h.HotelId === parseInt(HotelId)); // Match HotelId as integer

  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found." });
  }

  if (hotel.password !== password) {
    return res.status(401).json({ message: "Invalid password." });
  }

  res.status(200).json({ message: "Login successful", HotelId: hotel.HotelId });
});

// API to get hotel details by HotelId
app.get("/getHotelDetails", (req, res) => {
  const { HotelId } = req.query; // HotelId from query parameter

  if (!HotelId) {
    return res.status(400).json({ message: "HotelId is required." });
  }

  const hotels = readHotels();
  const hotel = hotels.find((h) => h.HotelId === parseInt(HotelId));

  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found." });
  }

  res.status(200).json(hotel); // Return the hotel details
});

// API to edit hotel details
app.put("/editHotelDetails", upload.single("mainImage"), (req, res) => {
  const { HotelId, HotelName, Location, password } = req.body;
  let { mainImage } = req.body;

  if (!HotelId || !HotelName || !Location || !password) {
    return res.status(400).json({
      message: "HotelId, HotelName, Location, and password are required.",
    });
  }

  // If a new image is uploaded, update the mainImage
  if (req.file) {
    mainImage = `http://localhost:5011/${req.file.filename}`; // Path to the uploaded image
  }

  const hotels = readHotels();
  const hotelIndex = hotels.findIndex((h) => h.HotelId === parseInt(HotelId));

  if (hotelIndex === -1) {
    return res.status(404).json({ message: "Hotel not found." });
  }

  // Update hotel details
  hotels[hotelIndex] = {
    ...hotels[hotelIndex],
    HotelName,
    Location,
    password,
    mainImage, // Update the mainImage
  };

  writeHotels(hotels); // Save updated hotels data back to the file

  res.status(200).json({ message: "Hotel details updated successfully." });
});

// Set up Multer for package image uploads
const packageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Save in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const packageUpload = multer({ storage: packageStorage });

// API to add packages
app.post("/addPackages", packageUpload.single("image"), (req, res) => {
  const { packageName, about, content, prices } = req.body;
  const hotelId = parseInt(req.headers.hotelid); // Get hotelId from frontend (browser storage)

  if (!hotelId) {
    return res.status(400).json({ message: "Hotel ID not found in request" });
  }

  // Load hotel data from JSON
  const hotelsData = JSON.parse(fs.readFileSync("data.json", "utf8"));
  const hotel = hotelsData.find((h) => h.HotelId === hotelId);

  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }

  // Ensure hotel has a packages array
  if (!hotel.packages) {
    hotel.packages = [];
  }

  // Construct package data
  const newPackage = {
    packageName,
    image: req.file ? `http://localhost:5011/${req.file.filename}` : "",
    about,
    content: JSON.parse(content), // Convert string to array
    prices: JSON.parse(prices), // Convert string to array
  };

  // Add package to hotel's package array
  hotel.packages.push(newPackage);

  // Save updated data back to file
  fs.writeFileSync("data.json", JSON.stringify(hotelsData, null, 2));

  res
    .status(201)
    .json({ message: "Package added successfully", package: newPackage });
});

// API to Get All Hotels
app.get("/getAllHotels", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading hotel data." });
    }
    const hotels = JSON.parse(data);
    res.json(hotels);
  });
});

// Read the hotels data from the JSON file
const getHotelsFromFileOrDatabase = () => {
  const filePath = path.join(__dirname, "data.json"); // Assuming your JSON is in the same directory
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data); // Return parsed hotel data
  } catch (err) {
    console.error("Error reading hotels file:", err);
    return [];
  }
};

app.get("/getHotelByName", (req, res) => {
  const { HotelName } = req.query;

  if (!HotelName) {
    return res.status(400).json({ message: "Hotel Name is required" });
  }

  // Get the hotel data from the file or database
  const hotels = getHotelsFromFileOrDatabase();

  // Find the hotel by name
  const hotel = hotels.find(
    (h) => h.HotelName.toLowerCase() === HotelName.toLowerCase()
  );

  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }

  // Return the hotel data
  res.json(hotel);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
