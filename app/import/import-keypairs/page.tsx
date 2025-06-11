"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { SolanaWallet, STORE_KEYPAIRS } from "../../../lib/crate/generated";
import { invoke } from "@tauri-apps/api/core";
import { store } from "../../../lib/store/store";
import { error } from "@tauri-apps/plugin-log";

export default function ImportKeypairsPage() {
  const [keypairs, setKeypairs] = React.useState<SolanaWallet[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch keypairs from store on mount
  React.useEffect(() => {
    async function fetchKeypairs() {
      try {
        const storeInstance = store();
        const result = await storeInstance.get<SolanaWallet[]>(STORE_KEYPAIRS);
        // Only show keypair(s) with account === 0
        setKeypairs((result || []).filter((kp: SolanaWallet) => kp.account === 0));
      } catch {
        setKeypairs([]);
      }
      setLoading(false);
    }
    fetchKeypairs();
  }, []);

  const handleGenerateNew = async () => {
    // You may want to implement a dialog for account index selection
    // For now, just generate with account = keypairs.length
    try {
      // Get seedUuid from the first keypair (if available)
      const seedUuid = keypairs[0]?.seed;
      if (!seedUuid) {
        error("No seed UUID found in keypairs.");
        return;
      }
      const newWallet = await invoke<SolanaWallet>("derive_new_keypair", {
        seedUuid,
        account: keypairs.length,
      });
      setKeypairs([...keypairs, newWallet]);
    } catch (e) {
      // handle error if needed
      error(`${e}`);
    }
  };

  if (loading) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/import" passHref legacyBehavior>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="text"
            color="primary"
            sx={{ mb: 1 }}
          >
            Back
          </Button>
        </Link>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          sx={{ mb: 1, ml: "auto" }}
        >
          Imported Keypairs
        </Typography>
      </Box>
      <Card sx={{ maxWidth: 480, width: "100%", boxShadow: 3 }}>
        <CardContent>
          {/* Remove the title here, as it's now in the header */}
          <List>
            {keypairs.length === 0 && (
              <ListItem>
                <ListItemText primary="No keypairs found." />
              </ListItem>
            )}
            {keypairs.map((wallet) => (
              <ListItem key={wallet.pubkey} divider>
                <ListItemText
                  primary={`Account ${wallet.account}`}
                  secondary={
                    <span style={{ fontFamily: "monospace" }}>{wallet.pubkey}</span>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleGenerateNew}
          >
            Generate New Address
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => window.location.assign("/home")}
          >
            I&apos;m done
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
