"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { store } from "../../lib/store/store";
import {
  SolanaWallet,
  STORE_ACTIVE_KEYPAIR,
  STORE_KEYPAIRS,
} from "../../lib/crate/generated";
import { debug } from "@tauri-apps/plugin-log";
import { redirect, useRouter } from "next/navigation";
import { useAppLock } from "../../lib/context/app-lock-context";
import WalletCard from "./components/wallet_card";
import ActivityCard from "./components/activity_card";
import { invoke } from "@tauri-apps/api/core";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

enum State {
  Loading,
  Loaded,
  Error,
}

// Helper to group stablecoins by denomination
// (kept here for ActivityCard to receive as prop)
function groupStablecoinsByDenomination(
  activities: {
    coin: string;
    amount: number;
    date: string;
    type: "received" | "sent";
  }[]
) {
  // Define mapping from coin to denomination
  const denominationMap: Record<string, string> = {
    USDC: "USD",
    USDT: "USD",
    USDG: "USD",
    EURC: "EUR",
    EURT: "EUR",
    // Add more as needed
  };

  // Group by denomination
  const grouped: Record<
    string,
    { coin: string; amount: number; date: string; type: "received" | "sent" }[]
  > = {};
  for (const activity of activities) {
    const denom = denominationMap[activity.coin] || activity.coin;
    if (!grouped[denom]) grouped[denom] = [];
    grouped[denom].push(activity);
  }
  return grouped;
}

export default function WalletHome() {
  // Placeholder data
  const balance = "$2,500.00";
  const userName = "Alex Morgan";
  const { lock } = useAppLock();
  const router = useRouter();
  const [wallet, setWallet] = React.useState<SolanaWallet | undefined>(
    undefined
  );
  const [state, setState] = React.useState(State.Loading);
  const [showSwitchModal, setShowSwitchModal] = React.useState(false);
  const [allKeypairs, setAllKeypairs] = React.useState<SolanaWallet[]>([]);

  // Simulate wallet loading, replace with real loading logic
  const loadWallet = async () => {
    try {
      const keypairs = await store().get<SolanaWallet[]>(STORE_KEYPAIRS);
      let walletActive: SolanaWallet | undefined;
      try {
        walletActive = await store().get<SolanaWallet>(STORE_ACTIVE_KEYPAIR);
      } catch {
        walletActive = undefined;
      }
      let wallet: SolanaWallet | undefined = walletActive;
      if (!wallet && Array.isArray(keypairs) && keypairs.length > 0) {
        wallet = keypairs[0];
        // Set the first wallet as active if none is active
        try {
          await invoke("set_active_keypair", { keypair: wallet });
        } catch (e) {
          // Optionally handle error
        }
      }
      debug(`wallet: ${wallet?.pubkey}`);
      setWallet(wallet);
      setState(State.Loaded);
    } catch {
      setState(State.Error);
    }
  };
  React.useEffect(() => {
    loadWallet();
  }, []);

  // Fetch all keypairs for switch modal
  React.useEffect(() => {
    async function fetchKeypairs() {
      try {
        const keypairs = await store().get<SolanaWallet[]>(STORE_KEYPAIRS);
        setAllKeypairs(keypairs || []);
      } catch {
        setAllKeypairs([]);
      }
    }
    fetchKeypairs();
  }, []);

  if (state === State.Loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f6fa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (state === State.Error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f6fa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "red" }}>Failed to load wallet.</span>
      </Box>
    );
  }

  if (!wallet) {
    lock();
    return redirect("/");
  }

  return (
    <Box
      sx={{
        minHeight: "unset",
        height: "auto",
        bgcolor: "#f5f6fa",
        pb: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 480 }}>
        <WalletCard
          userName={userName}
          balance={balance}
          wallet={wallet}
          onLock={() => {
            lock();
            router.replace("/");
          }}
          onDeposit={() => router.push("/deposit")}
          onSwitchKeypair={() => setShowSwitchModal(true)}
        />
        <ActivityCard
          groupStablecoinsByDenomination={groupStablecoinsByDenomination}
        />
      </Box>
      {/* Switch Keypair Modal */}
      <Modal
        open={showSwitchModal}
        onClose={() => setShowSwitchModal(false)}
        aria-labelledby="switch-keypair-modal"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            minWidth: 320,
            maxWidth: 400,
            outline: "none",
          }}
        >
          <Typography id="switch-keypair-modal" variant="h6" sx={{ mb: 2 }}>
            Switch Keypair
          </Typography>
          <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
            {allKeypairs.length === 0 && (
              <Typography color="text.secondary">No keypairs found.</Typography>
            )}
            {allKeypairs.map((kp) => (
              <Box
                key={kp.pubkey}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                  p: 1,
                  borderRadius: 1,
                  bgcolor:
                    wallet?.pubkey === kp.pubkey
                      ? "primary.light"
                      : "background.default",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  "&:hover": { bgcolor: "primary.lighter" },
                }}
                onClick={async () => {
                  try {
                    await invoke("set_active_keypair", { keypair: kp });
                    setWallet(kp);
                    setShowSwitchModal(false);
                  } catch (e) {
                    // Optionally handle error
                  }
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Account {kp.account}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ fontFamily: "monospace" }}
                  >
                    {kp.pubkey}
                  </Typography>
                </Box>
                {wallet?.pubkey === kp.pubkey && (
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Active
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setShowSwitchModal(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
