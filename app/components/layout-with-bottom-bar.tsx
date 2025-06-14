"use client";
import { Container } from "@mui/material";
import BottomTabBar from "../../lib/components/bottom-tab-bar";
import { useAppLock } from "../../lib/context/app-lock-context";
import React from "react";

export default function LayoutWithBottomBar({ children }: { children: React.ReactNode }) {
  const { locked } = useAppLock();
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    setInitialized(true);
  }, [locked]);

  return (
    <>
      <Container
        sx={{
          height: "auto",
          minHeight: "unset",
          display: "block",
          flex: "none",
        }}
      >
        {children}
      </Container>
      {initialized && !locked && <BottomTabBar />}
    </>
  );
}
