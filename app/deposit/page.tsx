"use client";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function DepositPage() {
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
        py: 4,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 4, boxShadow: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Deposit
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {/* Replace this with your deposit instructions or QR code */}
          To deposit funds, send your tokens to your wallet address.
        </Typography>
      </Card>
    </Box>
  );
}
