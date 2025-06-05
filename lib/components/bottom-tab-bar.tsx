import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { usePathname, useRouter } from "next/navigation";

export default function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isWallet = pathname === "/wallet";
  const isHomeFeed = pathname === "/home";

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        bgcolor: "#fff",
        boxShadow: "0 -2px 12px #0001",
        py: 2,
        px: 2,
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 420, display: "flex", gap: 1 }}>
        <Button
          startIcon={<HomeIcon />}
          variant={isHomeFeed ? "contained" : "outlined"}
          color="primary"
          fullWidth
          sx={{
            borderRadius: 2,
            fontSize: "1.4rem",
            boxShadow: 2,
            bgcolor: isHomeFeed ? "#1e88e5" : "#fff",
            color: isHomeFeed ? "#fff" : "#1e88e5",
            "&:hover": { bgcolor: isHomeFeed ? "#1565c0" : "#f3f4f6" },
            flex: 1,
            minWidth: 0,
            px: 0,
            py: 1.2,
            justifyContent: "center",
          }}
          onClick={() => {
            if (!isHomeFeed) router.push("/home");
          }}
        />
        <Button
          startIcon={<AccountBalanceWalletIcon />}
          variant={isWallet ? "contained" : "outlined"}
          color="primary"
          fullWidth
          sx={{
            borderRadius: 2,
            fontSize: "1.4rem",
            boxShadow: 2,
            minWidth: 0,
            px: 0,
            py: 1.2,
            flex: 1,
            justifyContent: "center",
            bgcolor: isWallet ? "#1e88e5" : "#fff",
            color: isWallet ? "#fff" : "#1e88e5",
            "&:hover": { bgcolor: isWallet ? "#1565c0" : "#f3f4f6" },
          }}
          onClick={() => {
            if (!isWallet) router.push("/wallet");
          }}
        />
      </Box>
    </Box>
  );
}
