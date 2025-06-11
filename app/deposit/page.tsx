"use client";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as React from "react";
import { QRCodeCanvas } from "qrcode.react"; // Use QRCodeCanvas instead of default export
import { store } from "../../lib/store/store";
import { SolanaWallet, WALET_0 } from "../../lib/crate/generated";

export default function DepositPage() {
  const router = useRouter();
  const [selectedDenom, setSelectedDenom] = React.useState("USD");
  const denominationOptions = ["USD", "EUR"]; // Add more as needed

  const [pubkey, setPubkey] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Get wallet from store, like in page.tsx
    (async () => {
      try {
        const wallet = await store().get<SolanaWallet>(WALET_0);
        setPubkey(wallet?.pubkey ?? null);
      } catch {
        setPubkey(null);
      }
    })();
  }, []);

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
      <Box sx={{ width: "100%", maxWidth: 480 }}>
        <Card
          sx={{
            width: "100%",
            maxWidth: "100%",
            p: 4,
            boxShadow: 3,
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pt: 2, pb: 1, pr: 1 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
              sx={{
                minWidth: 0,
                px: 1,
                py: 0.5,
                fontSize: "0.95rem",
                mr: 1,
                position: "static",
                top: "unset",
                left: "unset",
                zIndex: 1,
              }}
            >
              Back
            </Button>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="h5" fontWeight="bold" paddingRight={2}>
                Deposit
              </Typography>
            </Box>
          </Box>
          <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="denom-select-label">Stablecoin</InputLabel>
              <Select
                labelId="denom-select-label"
                value={selectedDenom}
                label="Stablecoin"
                onChange={e => setSelectedDenom(e.target.value)}
                sx={{
                  borderRadius: 3,
                  bgcolor: "#fff",
                  fontWeight: "bold",
                }}
              >
                {denominationOptions.map((denom) => (
                  <MenuItem key={denom} value={denom}>
                    {denom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* QR code above card payment */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
              <QRCodeCanvas value={pubkey ?? ""} size={160} />
              <Typography variant="caption" sx={{ mt: 1, color: "#888" }}>
                Scan to get address
              </Typography>
            </Box>
            {/* Card payment option */}
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                p: 2,
                mb: 2,
                boxShadow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="subtitle2" sx={{ color: "#1e88e5", mb: 1 }}>
                Pay with Card
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 2,
                  fontWeight: "bold",
                  px: 4,
                  py: 1,
                  bgcolor: "#1e88e5",
                  color: "#fff",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "#1565c0" },
                }}
                disabled
              >
                Card Payment (Coming Soon)
              </Button>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              To deposit funds, send your {selectedDenom} stablecoins to your wallet address.
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
