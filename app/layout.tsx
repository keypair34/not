"use client";

import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import BottomTabBar from "../lib/components/bottom-tab-bar";
import { AppLockProvider, useAppLock } from "../lib/context/app-lock-context";

function LayoutWithBottomBar({ children }: { children: React.ReactNode }) {
  const { locked } = useAppLock();
  return (
    <>
      <Container>{children}</Container>
      {!locked && <BottomTabBar />}
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <AppLockProvider>
            <LayoutWithBottomBar>{children}</LayoutWithBottomBar>
          </AppLockProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
