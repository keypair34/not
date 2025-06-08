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
  const [shouldShow, setShouldShow] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (!open) {
      setShouldShow(false);
      return;
    }
    (async () => {
      try {
        const wallet = await storeWallet().get<SolanaWallet>(WALET_0);
        if (!wallet?.pubkey) {
          setShouldShow(false);
          return;
        }
        const exists = await invoke<boolean>("check_pubkey", { pubkey: wallet.pubkey });
        setShouldShow(!exists);
      } catch {
        setShouldShow(false);
      }
    })();
  }, [open]);

  if (!open || shouldShow === false) return null;

  return (
    <>
      {shouldShow && !showUsername ? (
        <OnboardingCardAirdrop
          open={open}
          onSuccess={() => setShowUsername(true)}
          onClose={onClose}
        />
      ) : shouldShow && showUsername ? (
        <OnboardingCardUsername open={showUsername} onClose={() => { setShowUsername(false); onClose(); }} />
      ) : null}
    </>
  );
}
