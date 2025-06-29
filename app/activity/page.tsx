"use client";

import * as React from "react";
import { Suspense } from "react";
import LoadingCard from "@/lib/components/loading-card";
import ActivityDetailContent from "@/app/activity/components/activity_detail";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { selectionFeedback } from "@tauri-apps/plugin-haptics";
import { useRouter } from "next/navigation";

enum State {
  Loading,
  Loaded,
  Error,
}

export default function ActivityDetailPage() {
  const [state, setState] = React.useState(State.Loading);
  const router = useRouter();

  const loadActivity = async () => {
    setTimeout(() => {
      setState(State.Loaded);
    }, 2000);
  };

  const handleBack = async () => {
    try {
      await selectionFeedback();
    } catch {}
    router.back();
  };

  React.useEffect(() => {
    loadActivity();
  }, []);

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
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 0,
          boxShadow: 3,
          position: "relative",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", pl: 1, pt: 2, pb: 1 }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
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
        {state === State.Loading && <LoadingCard />}
        {state === State.Loaded && <ActivityDetailContent />}
      </Card>
    </Box>
  );
}
