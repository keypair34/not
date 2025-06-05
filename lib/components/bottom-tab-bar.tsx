"use client";

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { usePathname, useRouter } from "next/navigation";

export default function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const value = pathname === "/wallet" ? 1 : 0;

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0 && pathname !== "/home") {
      router.push("/home");
    } else if (newValue === 1 && pathname !== "/wallet") {
      router.push("/wallet");
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        zIndex: 100,
        boxShadow: "0 -2px 12px #0001",
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          width: "100%",
          maxWidth: 420,
          margin: "0 auto",
          bgcolor: "#fff",
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={{
            color: value === 0 ? "#1e88e5" : undefined,
            "&.Mui-selected": { color: "#1e88e5" },
          }}
        />
        <BottomNavigationAction
          label="Wallet"
          icon={<AccountBalanceWalletIcon />}
          sx={{
            color: value === 1 ? "#1e88e5" : undefined,
            "&.Mui-selected": { color: "#1e88e5" },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}
