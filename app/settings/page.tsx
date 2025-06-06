"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 0, boxShadow: 3, position: "relative" }}>
        <Box sx={{ pt: 4, pb: 2, px: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Settings
          </Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          <ListItem button sx={{ px: 4 }}>
            <ListItemText primary="Account" />
          </ListItem>
          <Divider />
          <ListItem button sx={{ px: 4 }}>
            <ListItemText primary="Security" />
          </ListItem>
          <Divider />
          <ListItem button sx={{ px: 4 }}>
            <ListItemText primary="Notifications" />
          </ListItem>
          <Divider />
          <ListItem button sx={{ px: 4 }}>
            <ListItemText primary="About" />
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
        }}
      >
        © {new Date().getFullYear()}{" "}
        <a
          href="https://bachmoney.5mb.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1e88e5", textDecoration: "underline" }}
        >
          bachmoney.5mb.app
        </a>
        <br />
        The Stable Foundation
      </Typography>
    </Box>
  );
}
