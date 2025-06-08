"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export type ActivityItem = {
  id: number;
  user: {
    name: string;
    avatar: string;
    wallet: string;
  };
  time: string;
  action: string;
  description: string;
  image?: string;
  amount: string;
};

export default function ActivityComponent({ item }: { item: ActivityItem }) {
  const router = useRouter();
  return (
    <Card
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
  );
}
