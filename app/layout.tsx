import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import BottomTabBar from "../lib/components/bottom-tab-bar";
// or `v1X-appRouter` if you are using Next.js v1X

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
          <Container>{children}</Container>
          <BottomTabBar />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
