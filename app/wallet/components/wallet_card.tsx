import * as React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import LockIcon from "@mui/icons-material/Lock";
import { SolanaWallet } from "../../../lib/crate/generated";

interface WalletCardProps {
  userName: string;
  balance: string;
  wallet: SolanaWallet;
  onLock: () => void;
  onDeposit: () => void;
}

export default function WalletCard({
  userName,
  balance,
  wallet,
  onLock,
  onDeposit,
}: WalletCardProps) {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 4,
        boxShadow: 6,
        p: 4,
        background: "linear-gradient(135deg, #212529 60%, #1e88e5 100%)",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Lock button in top right */}
      <Button
        size="small"
        variant="outlined"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          minWidth: 0,
          px: 1,
          borderColor: "#1e88e5",
          color: "#1e88e5",
          zIndex: 1,
        }}
        onClick={onLock}
        startIcon={<LockIcon />}
      >
        Lock
      </Button>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: "#fff" }}>
          <Typography variant="h5" color="#212529">
            {userName[0]}
          </Typography>
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold" color="#fff">
            {userName}
          </Typography>
          <Box
            sx={{
              mt: 1,
              mb: 1,
              bgcolor: "#fff",
              borderRadius: 1,
              px: 1.5,
              py: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              maxWidth: 260,
              boxShadow: 1,
            }}
          >
            <Tooltip title="Copy pubkey" arrow>
              <Typography
                variant="body2"
                sx={{
                  color: "#1e88e5",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "1.05rem",
                  wordBreak: "break-all",
                  whiteSpace: "pre-wrap",
                  flex: 1,
                  userSelect: "all",
                  m: 0,
                  p: 0,
                  cursor: "pointer",
                }}
                onClick={() =>
                  wallet?.pubkey &&
                  navigator.clipboard.writeText(wallet.pubkey)
                }
              >
                {wallet?.pubkey
                  ? `${wallet.pubkey.slice(0, 3)}...${wallet.pubkey.slice(
                      -3
                    )}`
                  : ""}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      </Stack>
      <Typography
        variant="subtitle2"
        sx={{ color: "#b0bec5", mb: 1, letterSpacing: 1 }}
      >
        Total Balance
      </Typography>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          color: "#fff",
          mb: 2,
          textShadow: "0 2px 12px #1e88e5cc",
          fontFamily: "Inter, Roboto, Arial, sans-serif",
        }}
      >
        {balance}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#fff",
            color: "#1e88e5",
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: 2,
            "&:hover": { bgcolor: "#e3f2fd" },
          }}
          fullWidth
          onClick={onDeposit}
        >
          Deposit
        </Button>
      </Stack>
    </Card>
  );
}
