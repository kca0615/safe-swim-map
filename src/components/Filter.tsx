import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";

interface FilterProps {
  // Callback to pass selected filters to parent
  onFilterChange: (filters: { region?: string[]; status?: string[] }) => void;
}

// Styled component for color indicators
const ColorIndicator = styled("div")<{ color: string }>(({ color }) => ({
  minWidth: "15px",
  width: "15px",
  height: "15px",
  backgroundColor: color,
  borderRadius: "50%",
  border: "1px solid #ccc",
  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
  marginRight: "8px",
}));

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  // State to manage selected region filter
  const [regionFilters, setRegionFilters] = useState<string[]>([]);
  // State to manage selected status filters
  const [statusFilters, setStatusFilters] = useState<string[]>([]);

  // Handle changes to region checkboxes
  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRegion = event.target.name;

     // Update selected regions based on checkbox state
    let updatedRegions;
    if (selectedRegion === "all") {
      updatedRegions = event.target.checked ? ["LA", "OC"] : [];
    } else {
      updatedRegions = event.target.checked
        ? [...regionFilters, selectedRegion]
        : regionFilters.filter((region) => region !== selectedRegion);
    }

    setRegionFilters(updatedRegions); // Update state
    onFilterChange({ region: updatedRegions, status: statusFilters }); // Notify parent
  };

  // Handle changes to status checkboxes
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedStatus = event.target.name;

    // Update selected statuses based on checkbox state
    let updatedStatuses;
    if (selectedStatus === "all") {
      updatedStatuses = event.target.checked ? ["safe", "caution", "unsafe"] : [];
    } else {
      updatedStatuses = event.target.checked
        ? [...statusFilters, selectedStatus]
        : statusFilters.filter((status) => status !== selectedStatus);
    }

    setStatusFilters(updatedStatuses);// Update state
    onFilterChange({ region: regionFilters, status: updatedStatuses }); // Notify parent
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      sx={{ padding: "8px", maxWidth: "700px", margin: "0 auto" }}
    >
      {/* Title and Blurb */}
      <Box>
        <Typography variant="h5" component="h5" gutterBottom>
          Surface Water - Indicator Bacteria Results Map
        </Typography>
        <Typography variant="body2">
          Indicator bacteria data from the California Environmental Data
          Exchange Network (CEDEN) and BeachWatch databases. Results include
          E. coli, enterococci, fecal coliforms, and total coliforms. There is
          some overlap with the CEDEN Water Chemistry dataset (
          <a
            href="https://data.ca.gov/dataset/surface-water-chemistry-results"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://data.ca.gov/dataset/surface-water-chemistry-results
          </a>
          ). Both datasets draw from the same source, but the resources here
          are updated more frequently to support the Safe to Swim map on the
          Water Boards My Water Quality portal.
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" gap={4}>
        {/* Combined Status Legend and Filter */}
        <FormControl component="fieldset" sx={{ flex: 2 }}>
          <Typography sx={{ fontSize: "1.15rem", fontWeight: 700 }}>
            Status
          </Typography>
          <FormGroup>
            {/* Status Checkboxes */}
            <FormControlLabel
              control={
                <Checkbox
                  name="all"
                  onChange={handleStatusChange}
                  checked={statusFilters.length === 3}
                />
              }
              label="All Statuses"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="safe"
                  onChange={handleStatusChange}
                  checked={statusFilters.includes("safe")}
                />
              }
              label={
                <Box display="flex" alignItems="center">
                  <ColorIndicator color="green" />
                  Safe <Typography sx={{fontSize:".75rem"}}>- Water quality within acceptable limits for swimming</Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="caution"
                  onChange={handleStatusChange}
                  checked={statusFilters.includes("caution")}
                />
              }
              label={
                <Box display="flex" alignItems="center">
                  <ColorIndicator color="yellow" />
                  Caution <Typography sx={{fontSize:".75rem"}}>- Potential concerns with water quality</Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="unsafe"
                  onChange={handleStatusChange}
                  checked={statusFilters.includes("unsafe")}
                />
              }
              label={
                <Box display="flex" alignItems="center">
                  <ColorIndicator color="red" />
                  Unsafe <Typography sx={{fontSize:".75rem"}}>- Swimming not recommended</Typography>
                </Box>
              }
            />
          </FormGroup>
        </FormControl>

        {/* Region Filter Section */}
        <FormControl component="fieldset" sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: "1.15rem", fontWeight: 700 }}>
            Region
          </Typography>
          <FormGroup>
            {/* Region Checkboxes */}
            <FormControlLabel
              control={
                <Checkbox
                  name="all"
                  onChange={handleRegionChange}
                  checked={regionFilters.length === 2}
                />
              }
              label="All Regions"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="LA"
                  onChange={handleRegionChange}
                  checked={regionFilters.includes("LA")}
                />
              }
              label="Los Angeles"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="OC"
                  onChange={handleRegionChange}
                  checked={regionFilters.includes("OC")}
                />
              }
              label="Orange County"
            />
          </FormGroup>
        </FormControl>
      </Box>
      {/* Footer Note */}
      <Typography variant="body2">*Click on the map marker to view your area's swim status and pH levels</Typography>
    </Box>
  );
};

export default Filter;
