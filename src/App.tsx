import React from "react";
import { Routes, Route } from "react-router-dom";
import StorePage from "./pages/Store";
import { CssBaseline, Container, Box, Typography } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: "#121212", minHeight: "100vh" }}>
        {/* Sticky Header */}
        <Box
          sx={{
            zIndex: 1000,
            bgcolor: "#000",
            borderBottom: "1px solid #333",
            py: 2,
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="h6" sx={{ color: "#fff" }}>
              CLO-SET Connect — Store
            </Typography>
          </Container>
        </Box>

        {/* Page Content */}
        <Container maxWidth="xl" sx={{ pt: 2 }}>
          <Routes>
            <Route path="/" element={<StorePage />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
}

export default App;
