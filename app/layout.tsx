import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
// or `v1X-appRouter` if you are using Next.js v1X

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Container>{children}</Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
