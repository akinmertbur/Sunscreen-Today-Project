"use strict";
import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

// Create an express app and set the port number.
const app = express();
const port = 3000;

// Determine API_URLs and API_KEYs.
const GEOCODING_API_URL = "https://www.mapquestapi.com/geocoding/v1/address";
const OPENUV_API_URL = "https://api.openuv.io/api/v1/uv";
const apiKeyGeocoding = process.env.GEOCODING_API_KEY;
const apiKeyOpenuv = process.env.OPENUV_API_KEY;

// Use the public folder for static files.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Use Axios to retrieve the geographical coordinates of the location.
const getCoordinates = async function (location) {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: { key: apiKeyGeocoding, location: location },
    });
    const latitude = response.data.results[0].locations[0].latLng.lat;
    const longitude = response.data.results[0].locations[0].latLng.lng;
    const arrCoordinates = [latitude, longitude];
    return arrCoordinates;
  } catch (error) {
    console.error("Failed to make request:", error.message);
    return;
  }
};

// When the user goes to the home page it should render the index.ejs file.
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Add a feature to the homepage (index.ejs) that determines
// whether sunscreen is needed today based on the UV index data.
app.post("/", async (req, res) => {
  const location = req.body["location"];

  // Retrieve the geographical coordinates of the location.
  const coordinates = await getCoordinates(location);

  // Use Axios to retrieve the UV index data and pass it to
  // index.ejs to display whether sunscreen is needed today.
  try {
    const response = await axios.get(OPENUV_API_URL, {
      // Add this API Key to x-access-token header of the request.
      headers: {
        "x-access-token": apiKeyOpenuv,
      },
      // Include parameters passed into the API request, specifying
      // the latitude (lat) and longitude (lng) extracted from the coordinates array.
      params: {
        lat: coordinates[0],
        lng: coordinates[1],
      },
    });

    res.render("index.ejs", {
      uv_index: response.data.result.uv,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

// Listen on the predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
