"use client";
import * as React from "react";
import OnboardingCardAirdrop from "./onboarding_card_airdrop";
import OnboardingCardUsername from "./onboarding_card_username";
import { invoke } from "@tauri-apps/api/core";
import { SolanaWallet, WALET_0 } from "../../../lib/crate/generated";
import { storeWallet } from "../../../lib/store/store";

type OnboardingCardProps = {
  open: boolean;
  onClose: () => void;
};

export default function OnboardingCard({ open, onClose }: OnboardingCardProps) {
  const [showUsername, setShowUsername] = React.useState(false);

  enum State {
    Loading,
    Loaded,
    Error,
  }
  const [state, setState] = React.useState<State>(State.Loading);
  const [shouldShow, setShouldShow] = React.useState<boolean | null>(null);
  const [checkResult, setCheckResult] = React.useState<any>(null);

  async function checkShouldShowOnboarding(cancelled: { current: boolean }, setShouldShow: (v: boolean) => void, setState: (v: State) => void, setCheckResult: (v: any) => void) {
    try {
      const wallet = await storeWallet().get<SolanaWallet>(WALET_0);
      if (!wallet?.pubkey) {
        if (!cancelled.current) {
          setShouldShow(false);
          setState(State.Loaded);
          setCheckResult(null);
        }
        return;
      }
      const exists = await invoke<boolean>("check_pubkey", { pubkey: wallet.pubkey });
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.log("Checking pubkey:", wallet.pubkey, "exists:", exists);
      }
      if (!cancelled.current) {
        setShouldShow(!exists);
        setState(State.Loaded);
        setCheckResult(exists);
      }
    } catch (err) {
      if (!cancelled.current) {
        setShouldShow(false);
        setState(State.Error);
        setCheckResult(err);
      }
    }
  }

  React.useEffect(() => {
    const cancelled = { current: false };
    if (!open) {
      setShouldShow(false);
      setState(State.Loaded);
      setCheckResult(null);
      return;
    }
    setState(State.Loading);
    checkShouldShowOnboarding(cancelled, setShouldShow, setState, setCheckResult);
    return () => {
      cancelled.current = true;
    };
  }, [open]);

  // Debug print for result
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("check_pubkey result:", checkResult);
  }

  if (!open || state === State.Error || shouldShow !== true) return null;
  if (state === State.Loading) return null;

  return (
    <>
      {!showUsername ? (
        <OnboardingCardAirdrop
          open={open}
          onSuccess={() => setShowUsername(true)}
          onClose={onClose}
        />
      ) : (
        <OnboardingCardUsername open={showUsername} onClose={() => { setShowUsername(false); onClose(); }} />
      )}
    </>
  );
}
