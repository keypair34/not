"use client";

import { useParams } from "next/navigation";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import WalletTokenHeader from "@/app/wallet/components/wallet-token-header";

export default function WalletTokenPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

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
          px: 2,
          py: 2,
          boxShadow: 3,
          position: "relative",
        }}
      >
        <WalletTokenHeader />
        <Divider />
        
      </Card>
    </Box>
  );
}
