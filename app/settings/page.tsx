"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function SettingsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 4, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Settings
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Settings page coming soon.
        </Typography>
      </Card>
    </Box>
  );
}
