"use client";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { AppLockProvider, useAppLock } from "../lib/context/app-lock-context";
import { debug, error as logError } from "@tauri-apps/plugin-log";
import LockedWalletView from "../lib/components/locked-wallet-view";
import CreateOrImportWalletView from "../lib/components/create-or-import-wallet-view";
import { storeWallet } from "../lib/store/store";
import { SolanaWallet, WALET_0 } from "../lib/crate/generated";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

enum State {
  Loading,
  Loaded,
  Error,
}
function MainPageContent() {
  const [wallet, setWallet] = useState<SolanaWallet | undefined>();
  const [state, setState] = useState(State.Loading);
  const { lock, locked } = useAppLock();
  const [showPassword, setShowPassword] = useState(false);

  const checkWallet = async () => {
    try {
      const wallet = await storeWallet().get<SolanaWallet>(WALET_0);
      // Debug log for wallet values using tauri log
      debug(`pubkey: ${wallet?.pubkey}`);
      setWallet(wallet);
      lock();
      setState(State.Loaded);
    } catch (err) {
      logError(`Error checking wallet: ${err}`);
      setState(State.Error);
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  if (state == State.Loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f5f6fa",
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            boxShadow: 3,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color="primary">
            Checking wallet...
          </Typography>
        </Card>
      </div>
    );
  }

  if (state == State.Loaded && wallet && locked) {
    return (
      <LockedWalletView
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    );
  }

    if (state == State.Loaded && wallet && !locked) {
      return redirect("/home")
    }

  return <CreateOrImportWalletView />;
}

export default function Page() {
  return (
    <AppLockProvider>
      <MainPageContent />
    </AppLockProvider>
  );
}
