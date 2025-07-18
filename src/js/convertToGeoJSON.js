const axios = require("axios");
const fs = require("fs");

// Define the API URL or path to the dataset
const API_URL =
  "https://data.ca.gov/api/3/action/datastore_search?resource_id=9dcf551f-452d-4257-b857-30fbcc883a03&limit=100";

// Function to fetch and process data
const fetchAndConvertData = async () => {
  try {
    // Fetch data from API
    const response = await axios.get(API_URL);
    const records = response.data.result.records;

    // Transform data to GeoJSON
    const geojson = {
      type: "FeatureCollection",
      features: records
        .filter(
          (record) =>
            record.Latitude && record.Longitude // Ensure valid coordinates
        )
        .map((record) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(record.Longitude),
              parseFloat(record.Latitude),
            ],
          },
          properties: {
            name: record.StationName || "Unknown",
            status:
              parseFloat(record.Result) > 7
                ? "safe"
                : parseFloat(record.Result) > 5
                ? "caution"
                : "unsafe",
            ph: parseFloat(record.Result),
            sampleDate: record.SampleDate || null,
            // Add region property based on station name
            region:
              record.StationName &&
              (/Los Angeles|\bLA\b/i.test(record.StationName)
                ? "LA"
                : /Orange|\bOC\b/i.test(record.StationName)
                ? "OC"
                : undefined),
          },
        })),
    };

    // Save GeoJSON to a file
    fs.writeFileSync("californiaGeoData.json", JSON.stringify(geojson, null, 2));
    console.log("GeoJSON file created successfully!");
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
};

// Run the function
fetchAndConvertData();
