# Safe Swim Map

Safe Swim Map is a React-based application designed to visualize water safety data in California. This project features an interactive map that displays data points indicating safe, cautionary, or unsafe swimming conditions based on chemical analysis, such as pH levels. Users can filter the data by region and status and view detailed information about specific locations.

## Features

- **Interactive Map**: Displays markers on a Mapbox GL map.
- **Dynamic Filtering**: Users can filter data by region and water safety status.
- **Popups**: Clickable markers show detailed information about each location.
- **Legend**: Explains the meaning of marker colors for quick reference.
- **Combined Status Filter and Legend**: Streamlined UI integrating legend and filtering.
- **Responsive Design**: Fully responsive map for different screen sizes.

---

## Setup Instructions

### Prerequisites

1. Ensure you have Node.js installed. If not, download it from [nodejs.org](https://nodejs.org/).
2. Install a package manager like npm or yarn (npm is bundled with Node.js).
3. Get a free Mapbox access token by creating an account at [Mapbox](https://www.mapbox.com/).

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd safe-swim-map
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Mapbox token:
   ```bash
   VITE_MAPBOX_TOKEN=your-mapbox-access-token
   ```

4. (Optional) If working with dynamic datasets, ensure the `californiaGeoData.json` file is placed in the `public/data` directory or another accessible location.

### Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
/src
  /components
    SafeSwimMap.tsx  - Main map component
    Filter.tsx       - Filtering component
  /data
    californiaGeoData.json  - GeoJSON file containing water safety data
.env                   - Environment variables (Mapbox token)
```

### Components

1. **SafeSwimMap**:
   - Renders the map using Mapbox GL.
   - Displays markers based on GeoJSON data.
   - Applies filters dynamically.
   - Ensures accessibility compliance for popups.

2. **Filter**:
   - Checkboxes for region and status filters, including "All" options.
   - Side-by-side layout for better usability.

---

## Data

### Dataset
The app uses GeoJSON data derived from California's public dataset for water safety. The dataset includes:
- Latitude and Longitude
- Station name
- pH level
- Safety status (safe, caution, unsafe)

### How to Update Data
1. Use the Node.js script (`convertToGeoJSON.js`) to fetch and convert raw data into GeoJSON format.
2. Place the updated `californiaGeoData.json` file in the appropriate directory.

---

## Technologies Used

- **React 18**: Frontend framework.
- **TypeScript**: Static typing for robust code.
- **Mapbox GL**: Interactive map rendering.
- **Material-UI (MUI)**: Streamlined UI components.
- **Vite**: Fast development build tool.

---

## Future Enhancements

- Add support for additional filtering parameters (e.g., date range).
- Integrate real-time data fetching via APIs.
- Implement clustering for dense datasets.
- Improve styling with advanced Material-UI theming.

---

## Troubleshooting

### Common Issues

1. **Map Not Displaying**:
   - Ensure the Mapbox token in `.env` is valid.
   - Confirm the `californiaGeoData.json` file is in the correct location.

2. **Dataset Not Loading**:
   - Check the fetch path or imported file path.
   - Validate that the `californiaGeoData.json` file contains valid GeoJSON data.

### Debugging Tips

- Use browser developer tools to check network requests and console logs.
- Test with a small static GeoJSON file before integrating dynamic datasets.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it for your needs.

---

## Acknowledgments

- [California Open Data Portal](https://data.ca.gov/) for the dataset.
- [Mapbox](https://www.mapbox.com/) for the mapping tools.
- [React](https://reactjs.org/) for the frontend framework.

