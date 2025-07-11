import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LoadingCard from "@/lib/components/loading-card";
import ActivityListView from "./activity_list_view";

interface Activity {
  coin: string;
  amount: number;
  date: string;
  type: "received" | "sent" | "airdrop";
}

enum State {
  Loading,
  Loaded,
  Error,
}

interface ActivityCardProps {
  groupStablecoinsByDenomination: (
    activities: Activity[],
  ) => Record<string, Activity[]>;
}

export default function ActivityCard({
  groupStablecoinsByDenomination,
}: ActivityCardProps) {
  // Add loading state
  const [state, setState] = React.useState(State.Loading);

  // Example activities data moved here
  const activities: Activity[] = [
    { coin: "BACH", amount: 10.9345, date: "Jun 9, 2025", type: "airdrop" },
    { coin: "BACH", amount: 100.0, date: "Jun 10, 2025", type: "received" },
    { coin: "BACH", amount: 50.0, date: "Jun 11, 2025", type: "sent" },
    { coin: "BACH", amount: 25.0, date: "Jun 12, 2025", type: "received" },
    { coin: "BACH", amount: 10.0, date: "Jun 13, 2025", type: "sent" },
    { coin: "USDC", amount: 5.0, date: "Jun 14, 2025", type: "received" },
    { coin: "USDC", amount: 2.5, date: "Jun 15, 2025", type: "sent" },
    { coin: "BACH", amount: 1.25, date: "Jun 16, 2025", type: "received" },
    { coin: "USDC", amount: 0.625, date: "Jun 17, 2025", type: "sent" },
    { coin: "USDC", amount: 0.3125, date: "Jun 18, 2025", type: "received" },
  ];

  const loadActivities = async () => {
    setTimeout(() => {
      setState(State.Loaded);
    }, 2000); // 2 seconds delay
  };

  React.useEffect(() => {
    loadActivities();
  }, []);

  const groupedActivities = groupStablecoinsByDenomination(activities);

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: 2,
        background: "linear-gradient(135deg, #f5f6fa 60%, #e3f2fd 100%)",
        overflow: "hidden",
        p: 4,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2, color: "#212529" }}
      >
        Recent Activity (demo)
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {state === State.Loading && <LoadingCard />}
      {state === State.Loaded && (
        <ActivityListView groupedActivities={groupedActivities} />
      )}
    </Card>
  );
}
