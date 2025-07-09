import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; // Set the Mapbox access token

interface SafeSwimMapProps {
  filters: {
    region?: string[];
    status?: string[];
  };
}

const SafeSwimMap: React.FC<SafeSwimMapProps> = ({ filters }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null); // Reference for the map container
  const mapRef = useRef<mapboxgl.Map | null>(null); // Reference for the Mapbox map
  const [geojsonData, setGeojsonData] = useState<any>(null); // State to store GeoJSON data

  // Fetch GeoJSON data and apply filters
  useEffect(() => {
    fetch("/data/californiaGeoData.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredFeatures = data.features.filter((feature: any) => {
          const matchesRegion =
            !filters.region || filters.region.includes(feature.properties.region || "");
          const matchesStatus =
            !filters.status || filters.status.includes(feature.properties.status || "");
          return matchesRegion && matchesStatus;
        });

        if (filteredFeatures.length === 0) {
          console.warn("No features match the applied filters.");
        }

        setGeojsonData({
          ...data,
          features: filteredFeatures,
        });
      })
      .catch((err) => console.error("Error loading GeoJSON data:", err));
  }, [filters]);

  // Initialize Mapbox map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    try {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11", // Map style
          center: [-118.2, 33.9], // Map center coordinates
          zoom: 9, // Initial zoom level
        });

        mapRef.current.on("load", () => {
          console.log("Map loaded successfully.");
        });

        mapRef.current.on("error", (e) => {
          console.error("Mapbox error:", e.error);
        });    
    } catch (error) {
      console.error("Error initializing Mapbox:", error);
    }
    return () => {
      mapRef.current?.remove(); // Clean up map instance on unmount
      mapRef.current = null;
    };

  }, []);

  // Add data source and layer when geojsonData changes
  useEffect(() => {
    if (!mapRef.current || !geojsonData) return;

    const map = mapRef.current;

    const addSourceAndLayer = () => {
      if (map.getSource("swim-locations")) {
        (map.getSource("swim-locations") as mapboxgl.GeoJSONSource).setData(geojsonData);
      } else {
        map.addSource("swim-locations", {
          type: "geojson",
          data: geojsonData,
        });

        map.addLayer({
          id: "swim-points",
          type: "circle",
          source: "swim-locations",
          paint: {
            "circle-radius": 10,
            "circle-color": [
              "match",
              ["get", "status"],
              "safe",
              "green",
              "caution",
              "yellow",
              "unsafe",
              "red",
              "gray",
            ],
            "circle-stroke-width": 3,
            "circle-stroke-color": "rgba(0, 0, 0, 0.2)",
          },
        });
      }
    };

    if (map.isStyleLoaded()) {
      addSourceAndLayer();
    } else {
      map.once("style.load", addSourceAndLayer);
    }
  }, [geojsonData]);

  // Handle click events for popups
  useEffect(() => {
    if (!mapRef.current || !geojsonData) return;

    const map = mapRef.current;

    const handleClick = (
      e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }
    ) => {
      const feature = e.features?.[0];
      if (!feature || feature.geometry.type !== "Point") return;

      const coordinates = [...(feature.geometry.coordinates as [number, number])];
      const { name, status, ph, sampleDate, dataRetrievalDate } = feature.properties || {};

      // Handle longitude wrapping
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Format the sample date for display
      const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        try {
          const date = new Date(dateString);
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        } catch {
          return "N/A";
        }
      };

      new mapboxgl.Popup()
        .setLngLat(coordinates as [number, number])
        .setHTML(
          `<div>
              <strong>${name || "Unknown Location"}</strong><br>
              Status: ${status || "N/A"}<br>
              pH Level: ${ph || "N/A"}<br>
              Sample Date: ${formatDate(sampleDate)}<br>
              <small style="color: #666;">Data Retrieved: ${formatDate(dataRetrievalDate)}</small>
            </div>`
        )
        .addTo(map);
    };

    map.on("click", "swim-points", handleClick);

    return () => {
      if (map.getLayer("swim-points")) {
        map.off("click", "swim-points", handleClick);
      }
    };
  }, [geojsonData]);
useEffect(() => {
  console.log("Filters applied:", filters);
  console.log("GeoJSON Data:", geojsonData);
}, [filters, geojsonData]);
useEffect(() => {
  if (!geojsonData) {
    console.error("GeoJSON data is null or undefined.");
    return;
  }

  if (!geojsonData.features || geojsonData.features.length === 0) {
    console.error("GeoJSON data has no features.");
    return;
  }

  console.log("GeoJSON Data:", geojsonData);
}, [geojsonData]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "calc(100vh - 150px)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
};

export default SafeSwimMap;
