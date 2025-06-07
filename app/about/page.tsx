"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "unset",
        height: "auto",
        bgcolor: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 0, boxShadow: 3, position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pt: 2, pb: 1 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{
              minWidth: 0,
              px: 1,
              py: 0.5,
              fontSize: "0.95rem",
              mr: 1,
            }}
          >
            Back
          </Button>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end"}}>
            <Typography variant="h5" fontWeight="bold" paddingRight={8}>
              About
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ px: 4, py: 3, pr: 5 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <b>Not Wallet</b> is a modern, open-source Solana wallet app built for privacy, simplicity, and security.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This app is developed and maintained by The Stable Foundation. For more information, visit our website or check out the source code.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Version: 0.0.1
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
