"use client";

import { useParams } from "next/navigation";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import WalletTokenHeader from "@/app/wallet/components/wallet-token-header";
import { WalletTokenContent } from "../components/wallet-token-content";
import { invoke } from "@tauri-apps/api/core";
import * as log from "@tauri-apps/plugin-log";

export default function WalletTokenPage() {
  const params = useParams();
  const id = params.id;

  // States
  const [token, setToken] = React.useState("$BACH");

  // Functions
  const init = async () => {
    try {
      const response = await invoke<{
        id: string;
        name: string;
        symbol: string;
        decimals: number;
      }>("get_token_info", { id: id });
      setToken(response.name);
    } catch (error) {
      log.error(`Error fetching token info: ${error}`);
    }
  };

  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box
      sx={{
        height: "auto",
        bgcolor: "#f5f6fa",
        pb: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        <WalletTokenHeader token={token} />
        <Divider />
        <WalletTokenContent />
      </Card>
    </Box>
  );
}
