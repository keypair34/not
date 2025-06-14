"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AppLockProvider } from "../lib/context/app-lock-context";
import React from "react";
import LayoutWithBottomBar from "./components/layout-with-bottom-bar";

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
        <style>{`
          html, body {
            touch-action: pan-x pan-y;
            overscroll-behavior: none;
          }
        `}</style>
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
