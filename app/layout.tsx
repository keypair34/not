"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AppLockProvider } from "../lib/context/app-lock-context";
import React from "react";
import LayoutWithBottomBar from "./components/layout-with-bottom-bar";
import {
  ThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    setMode("light");
  }

  const darkTheme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });

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
        <ThemeProvider theme={darkTheme} defaultMode="light">
          <CssBaseline />
          <AppRouterCacheProvider>
            <AppLockProvider>
              <LayoutWithBottomBar>{children}</LayoutWithBottomBar>
            </AppLockProvider>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
