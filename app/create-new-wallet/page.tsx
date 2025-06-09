"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function CreateNewWalletPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%", p: 4, boxShadow: 4 }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ minWidth: 0 }}
          >
            Back
          </Button>
          <Box sx={{ flex: 1 }} />
          <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "right" }}>
            Create New Wallet
          </Typography>
        </Stack>
        <Typography sx={{ mb: 3 }}>
          Here you can create a new keypair or mnemonic for your wallet.
        </Typography>
        {/* Placeholder for actual wallet creation logic */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled
        >
          Create Wallet (Coming Soon)
        </Button>
      </Card>
    </Box>
  );
}
