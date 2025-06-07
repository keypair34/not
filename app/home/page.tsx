"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Button from "@mui/material/Button";
import { openUrl } from "@tauri-apps/plugin-opener";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { invoke } from "@tauri-apps/api/core";

export const feed = [
  {
    id: 1,
    user: {
      name: "Alex Morgan",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=alexmorgan",
      wallet: "7k3h...2x9v",
    },
    time: "2 hours ago",
    action: "Received 1,000 USDC",
    description: "Payment from @johnny for freelance work.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=480&q=80", // freelance work
    amount: "+1,000 USDC",
  },
  {
    id: 2,
    user: {
      name: "Alex Morgan",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=alexmorgan",
      wallet: "7k3h...2x9v",
    },
    time: "1 day ago",
    action: "Sent 250 USDC",
    description: "Sent to @coffeehouse for coffee subscription.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=480&q=80", // coffee
    amount: "-250 USDC",
  },
];

export default function HomeFeedPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [signing, setSigning] = useState(false);
  const [signResult, setSignResult] = useState<string | null>(null);
  const router = useRouter();

  const handleSign = async () => {
    setSigning(true);
    setSignResult(null);
    try {
      // You can customize the message as needed
      const message = "Claim €BACH airdrop";
      const signature = await invoke<string>("sign_message", { message });
      setSignResult(signature);
    } catch (e: any) {
      setSignResult("Failed to sign message: " + (e?.toString() || "Unknown error"));
    }
    setSigning(false);
  };

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
      {/* Onboarding Card BELOW the title, ABOVE the feed */}
      {showOnboarding && (
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
            onClick={() => setShowOnboarding(false)}
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
      )}
      {/* Modal for sign with keys info */}
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
      <Box sx={{ width: "100%", maxWidth: 480 }}>
        {feed.map((item) => (
          <Card
            key={item.id}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 2,
              background: "#fff",
              overflow: "hidden",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
              "&:hover": { boxShadow: 6, bgcolor: "#f3f4f6" },
            }}
            onClick={() => router.push(`/activity?id=${item.id}`)}
          >
            <CardHeader
              avatar={
                <Avatar src={item.user.avatar} alt={item.user.name}>
                  {item.user.name[0]}
                </Avatar>
              }
              title={
                <Box>
                  <Typography fontWeight="bold" variant="subtitle1">
                    {item.user.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.95rem",
                      wordBreak: "break-all",
                      display: "block",
                    }}
                  >
                    {item.user.wallet}
                  </Typography>
                </Box>
              }
              subheader={
                <Typography variant="caption" color="text.secondary">
                  {item.time}
                </Typography>
              }
            />
            {item.image && (
              <Box
                component="img"
                src={item.image}
                alt={item.action}
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  bgcolor: "#f3f4f6",
                }}
              />
            )}
            <CardContent sx={{ pb: 1 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ mb: 0.5 }}
              >
                {item.action}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {item.description}
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: item.amount.startsWith("+") ? "#43a047" : "#e53935",
                  fontFamily: "monospace",
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                {item.amount}
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton>
                  <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
