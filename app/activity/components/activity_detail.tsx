import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import { feed } from "@/app/home/components/feed";
import Typography from "@mui/material/Typography";

function ActivityDetailContent() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const activity = feed.find((item) => item.id === id);

  if (!activity) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f6fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error" variant="h6">
          Activity not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
        {activity.action}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {activity.description}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <b>Amount:</b> {activity.amount}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <b>Date:</b> {activity.time}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <b>Wallet:</b> {activity.user.wallet}
      </Typography>
    </Box>
  );
}

export default ActivityDetailContent;
