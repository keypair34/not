"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { feed } from "../home/components/feed";

function ActivityDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = Number(searchParams.get("id"));
  const activity = feed.find((item) => item.id === id);

  if (!activity) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f6fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error" variant="h6">
          Activity not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "unset",
        height: "auto",
        bgcolor: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 0, boxShadow: 3, position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pt: 2, pb: 1 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{
              minWidth: 0,
              px: 1,
              py: 0.5,
              fontSize: "0.95rem",
              mr: 1,
            }}
          >
            Back
          </Button>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="h5" fontWeight="bold" paddingRight={2}>
              Activity
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ px: 4, py: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            {activity.action}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {activity.description}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <b>Amount:</b> {activity.amount}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <b>Date:</b> {activity.time}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <b>Wallet:</b> {activity.user.wallet}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default function ActivityDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActivityDetailContent />
    </Suspense>
  );
}
