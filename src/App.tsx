import React, { useState } from "react";
import SafeSwimMap from "./components/SafeSwimMap";
import Filter from "./components/Filter";
import { Box, Container, Paper } from "@mui/material";

function App() {
  const [filters, setFilters] = useState<{ region?: string[]; status?: string[] }>({});

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2, mb: 2 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Filter onFilterChange={(newFilters) => setFilters(newFilters)} />
        </Paper>
      </Box>
      <SafeSwimMap filters={filters} />
    </Container>
  );
};

export default App;
