"use client";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useAppLock } from "../lib/context/app-lock-context";
import { debug, error as logError } from "@tauri-apps/plugin-log";
import LockedWalletView from "../lib/components/locked-wallet-view";
import CreateOrImportWalletView from "../lib/components/create-or-import-wallet-view";
import { Seed, STORE_KEYPAIRS } from "../lib/crate/generated";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { store } from "../lib/store/store";

enum State {
  Loading,
  Loaded,
  Error,
}

function MainPageContent() {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [state, setState] = useState(State.Loading);
  const { lock, locked, unlock } = useAppLock();
  const [showPassword, setShowPassword] = useState(false);

  const checkSeeds = async () => {
    try {
      const seeds = await store().get<Seed[]>(STORE_KEYPAIRS);
      if (seeds) {
        // Debug log for wallet values using tauri log
        debug(`seeds: ${seeds}`);
        setSeeds(seeds);
        lock();
      }
      setState(State.Loaded);
    } catch (err) {
      logError(`Error checking wallet: ${err}`);
      setState(State.Error);
    }
  };

  const handleUnlock = async () => {
    unlock();
  };

  useEffect(() => {
    checkSeeds();
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

  if (state == State.Error) {
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
          <Typography variant="h6" color="error">
            Error checking wallet
          </Typography>
        </Card>
      </div>
    );
  }

  if (state == State.Loaded && seeds?.length > 0 && locked) {
    return (
      <LockedWalletView
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onUnlock={handleUnlock}
      />
    );
  }

  if (state == State.Loaded && seeds && !locked) {
    return redirect("/home");
  }

  return <CreateOrImportWalletView />;
}

export default function Page() {
  return <MainPageContent />;
}
