"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { openUrl } from "@tauri-apps/plugin-opener";
import { useRouter } from "next/navigation";
import { selectionFeedback } from "@tauri-apps/plugin-haptics";

export default function SettingsPage() {
  const router = useRouter();

  // Centralized click handler for all links
  const handleClick = async (type: "about" | "openSource" | "footer") => {
    await selectionFeedback();
    if (type === "about") {
      router.push("/about");
    } else if (type === "openSource") {
      openUrl("https://github.com/TheStableFoundation/not");
    } else if (type === "footer") {
      openUrl("https://bach.money/");
    }
  };

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
        <Box sx={{ pt: 4, pb: 2, px: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Settings
          </Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          <ListItem
            sx={{
              px: 4,
              cursor: "pointer",
              minHeight: 56,
              borderRadius: 2,
              "&:hover": { bgcolor: "#f3f4f6" },
              transition: "background 0.2s",
            }}
            onClick={() => handleClick("about")}
            component="li"
            disablePadding
          >
            <ListItemText
              primary="About"
              primaryTypographyProps={{
                sx: { fontSize: "1.08rem", fontWeight: 500, py: 1 },
              }}
            />
          </ListItem>
          <Divider />
          <ListItem
            sx={{
              px: 4,
              cursor: "pointer",
              minHeight: 56,
              borderRadius: 2,
              "&:hover": { bgcolor: "#f3f4f6" },
              transition: "background 0.2s",
            }}
            onClick={() => handleClick("openSource")}
            component="li"
            disablePadding
          >
            <ListItemText
              primary="Open Source"
              primaryTypographyProps={{
                sx: { fontSize: "1.08rem", fontWeight: 500, py: 1 },
              }}
            />
          </ListItem>
        </List>
      </Card>
      <Typography
        variant="body2"
        sx={{
          mt: 3,
          color: "#888",
          fontStyle: "italic",
          textAlign: "center",
          wordBreak: "break-all",
          cursor: "pointer",
        }}
        onClick={() => handleClick("footer")}
      >
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "#1e88e5", textDecoration: "underline" }}>
          bach.money
        </span>
        <br />
        The Stable Foundation
      </Typography>
    </Box>
  );
}
