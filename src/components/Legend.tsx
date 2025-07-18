import React from "react";
import { styled, Typography } from "@mui/material";

const LegendContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const ColorIndicator = styled("div")<{ color: string }>(({ color }) => ({
  minWidth: "20px",
  width: "20px",
  height: "20px",
  backgroundColor: color,
  borderRadius: "50%",
  border: "1px solid #ccc",
  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
  marginRight: "8px",
}));

const LegendItem = styled("div")({
  display: "flex",
  alignItems: "center",
});

function Legend() {
  return (
    <LegendContainer>
      <LegendItem>
        <ColorIndicator color="green" />
        <Typography variant="body2">
          <strong>Safe</strong> - Water quality within acceptable limits for swimming
        </Typography>
      </LegendItem>
      <LegendItem>
        <ColorIndicator color="yellow" />
        <Typography variant="body2">
          <strong>Caution</strong> - Potential concerns with water quality.
        </Typography>
      </LegendItem>
      <LegendItem>
        <ColorIndicator color="red" />
        <Typography variant="body2">
          <strong>Unsafe</strong> - Swimming not recommended.
        </Typography>
      </LegendItem>
    </LegendContainer>
  );
}

export default Legend;
