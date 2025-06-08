"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import OnboardingCard from "./components/onboarding_card";
import { feed } from "./components/feed";
import ActivityComponent from "./components/activity_component";
import { invoke } from "@tauri-apps/api/core";
import { SolanaWallet, WALET_0 } from "../../lib/crate/generated";
import { storeWallet } from "../../lib/store/store";
import { debug as tauriDebug } from "@tauri-apps/plugin-log";

enum OnboardingState {
  Loading,
  Show,
  Hide,
  Error,
}

export default function HomeFeedPage() {
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(OnboardingState.Loading);

  async function checkOnboarding(setOnboardingState: (s: OnboardingState) => void) {
    try {
      const wallet = await storeWallet().get<SolanaWallet>(WALET_0);
      if (!wallet?.pubkey) {
        setOnboardingState(OnboardingState.Hide);
        return;
      }
      const exists = await invoke<boolean>("check_pubkey", { pubkey: wallet.pubkey });
      tauriDebug(`check_pubkey exists: ${exists}, pubkey: ${wallet.pubkey}`);
      setOnboardingState(exists ? OnboardingState.Hide : OnboardingState.Show);
    } catch (err) {
      tauriDebug(`check_pubkey error: ${err}`);
      setOnboardingState(OnboardingState.Error);
    }
  }

  React.useEffect(() => {
    checkOnboarding(setOnboardingState);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        pb: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 480, pt: 3, pb: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          sx={{ mb: 2 }}
        >
          Activity Feed
        </Typography>
      </Box>
      {onboardingState === OnboardingState.Loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "30vh",
            background: "transparent",
          }}
        >
          <span style={{ color: "#1e88e5", fontWeight: 500, fontSize: 18 }}>
            Checking onboarding...
          </span>
        </div>
      )}
      {onboardingState === OnboardingState.Show && (
        <OnboardingCard open={true} onClose={() => setOnboardingState(OnboardingState.Hide)} />
      )}
      <Box sx={{ width: "100%", maxWidth: 480 }}>
        {feed.map((item) => (
          <ActivityComponent key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
}
