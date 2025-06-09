"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { storeWallet } from "../../lib/store/store";
import { SolanaWallet, WALET_0 } from "../../lib/crate/generated";
import { debug } from "@tauri-apps/plugin-log";
import { redirect, useRouter } from "next/navigation";
import { useAppLock } from "../../lib/context/app-lock-context";
import WalletCard from "./components/wallet_card";
import ActivityCard from "./components/activity_card";

enum State {
  Loading,
  Loaded,
  Error,
}

// Helper to group stablecoins by denomination
function groupStablecoinsByDenomination(activities: { coin: string; amount: number; date: string; type: "received" | "sent" }[]) {
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
  const grouped: Record<string, { coin: string; amount: number; date: string; type: "received" | "sent" }[]> = {};
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
  // Simulate wallet loading, replace with real loading logic
  const loadWallet = async () => {
    try {
      const wallet = await storeWallet().get<SolanaWallet>(WALET_0);
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

  // Example activities data
  const activities: { coin: string; amount: number; date: string; type: "received" | "sent" }[] = [
    { coin: "USDC", amount: 1000, date: "Jun 12, 2024", type: "received" },
    { coin: "USDT", amount: 500, date: "Jun 11, 2024", type: "received" },
    { coin: "USDG", amount: 200, date: "Jun 10, 2024", type: "received" },
    { coin: "USDC", amount: 250, date: "Jun 10, 2024", type: "sent" },
    { coin: "EURC", amount: 100, date: "Jun 9, 2024", type: "received" },
    // ...other activities...
  ];

  const groupedActivities = groupStablecoinsByDenomination(activities);

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
        />
        <ActivityCard groupedActivities={groupedActivities} />
      </Box>
    </Box>
  );
}
