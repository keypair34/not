import * as React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import LockIcon from "@mui/icons-material/Lock";
import { SolanaWallet } from "../../../lib/crate/generated";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { selectionFeedback } from "@tauri-apps/plugin-haptics";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { invoke } from "@tauri-apps/api/core";

interface WalletCardProps {
  userName: string;
  wallet: SolanaWallet;
  onLock: () => void;
  onDeposit: () => void;
  onSwitchKeypair: () => void;
}

export default function WalletCard({
  userName,
  wallet,
  onLock,
  onDeposit,
  onSwitchKeypair,
}: WalletCardProps) {
  const router = useRouter();

  const [balance, setBalance] = React.useState<string>("");

  // Handler for creating new keypair/mnemonic
  const handleCreateNew = async () => {
    await selectionFeedback();
    router.push("/create-new-wallet");
  };

  const init = async () => {
    const balance = await invoke<string>("get_bach_balance", {
      pubkey: wallet.pubkey,
    });
    setBalance(`${balance} BACH`);
  };

  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              width: "100%", // Make the box extend to the end of the container
              maxWidth: "100%",
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
                onClick={async () => {
                  if (wallet?.pubkey) {
                    await writeText(wallet.pubkey);
                  }
                }}
              >
                {wallet?.pubkey
                  ? `${wallet.pubkey.slice(0, 3)}...${wallet.pubkey.slice(-3)}`
                  : ""}
              </Typography>
            </Tooltip>
            {/* Switch button after pubkey, before plus button */}
            <Tooltip title="Switch keypair" arrow>
              <IconButton
                sx={{
                  color: "#1e88e5",
                  bgcolor: "#f5f6fa",
                  "&:hover": { bgcolor: "#e3f2fd" },
                  ml: 1,
                }}
                onClick={onSwitchKeypair}
                size="small"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 17L21 12L16 7"
                    stroke="#1e88e5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12H9"
                    stroke="#1e88e5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 7L3 12L8 17"
                    stroke="#1e88e5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconButton>
            </Tooltip>
            <Tooltip title="Create new keypair or mnemonic" arrow>
              <IconButton
                sx={{
                  color: "#1e88e5",
                  bgcolor: "#f5f6fa",
                  "&:hover": { bgcolor: "#e3f2fd" },
                  ml: 1,
                }}
                onClick={handleCreateNew}
                size="small"
              >
                <AddIcon fontSize="small" />
              </IconButton>
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
