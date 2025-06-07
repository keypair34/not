"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { openUrl } from "@tauri-apps/plugin-opener";
import { invoke } from "@tauri-apps/api/core";

type OnboardingCardProps = {
  open: boolean;
  onClose: () => void;
};

export default function OnboardingCard({ open, onClose }: OnboardingCardProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [signing, setSigning] = React.useState(false);
  const [signResult, setSignResult] = React.useState<string | null>(null);

  const handleSign = async () => {
    setSigning(true);
    setSignResult(null);
    try {
      const now = Date.now();
      const message = `I want my €BACH ${now}`;
      const signature = await invoke<string>("sign_message", { message });
      setSignResult(signature);
    } catch (e: any) {
      setSignResult("Failed to sign message: " + (e?.toString() || "Unknown error"));
    }
    setSigning(false);
  };

  if (!open) return null;

  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: 480,
          mb: 3,
          borderRadius: 4,
          boxShadow: 6,
          background: "linear-gradient(135deg, #212529 60%, #1e88e5 100%)",
          color: "#fff",
          position: "relative",
          overflow: "visible",
          border: "2px solid #1e88e5",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "#1e88e5",
            bgcolor: "#fff",
            "&:hover": { bgcolor: "#e3f2fd" },
            zIndex: 2,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              mb: 1,
              color: "#fff",
              textShadow: "0 2px 8px #1e88e599",
              letterSpacing: 1,
            }}
          >
            🎉 Claim Your €BACH Airdrop!
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#fff",
              color: "#1e88e5",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: 3,
              boxShadow: 2,
              px: 4,
              py: 1.5,
              "&:hover": { bgcolor: "#e3f2fd", color: "#1565c0" },
              transition: "all 0.2s",
            }}
            onClick={() => setModalOpen(true)}
          >
            Sign Up &amp; Claim
          </Button>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 2,
              color: "#b0bec5",
              cursor: "pointer",
            }}
            onClick={() => openUrl("https://bachmoney.5mb.app/")}
          >
            Your wallet address will be used for the airdrop.
            <br />
            <span style={{ color: "#1e88e5", textDecoration: "underline" }}>
              bachmoney.5mb.app
            </span>
          </Typography>
        </Box>
      </Card>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSignResult(null);
        }}
        aria-labelledby="sign-modal-title"
        aria-describedby="sign-modal-desc"
      >
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            minWidth: 320,
            maxWidth: "90vw",
            textAlign: "center",
          }}
        >
          <Typography id="sign-modal-title" variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Claim Airdrop
          </Typography>
          <Typography id="sign-modal-desc" variant="body1" sx={{ mb: 2 }}>
            Sign this message by clicking the button below.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSign}
            sx={{ mt: 2, px: 4, borderRadius: 2 }}
            disabled={signing}
          >
            {signing ? "Signing..." : "Sign"}
          </Button>
          {signResult && (
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                wordBreak: "break-all",
                color: signResult.startsWith("Failed") ? "error.main" : "success.main",
              }}
            >
              {signResult}
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}
