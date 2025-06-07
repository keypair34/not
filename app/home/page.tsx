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
import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingCard from "./components/onboarding_card";
import { feed } from "./components/feed";
import ActivityComponent from "./components/activity_component";

export default function HomeFeedPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const router = useRouter();

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
      <OnboardingCard open={showOnboarding} onClose={() => setShowOnboarding(false)} />
      <Box sx={{ width: "100%", maxWidth: 480 }}>
        {feed.map((item) => (
          <ActivityComponent key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
}
