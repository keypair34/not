import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import InfoIcon from "@mui/icons-material/Info";

interface Activity {
  coin: string;
  amount: number;
  date: string;
  type: "received" | "sent" | "airdrop";
}

interface ActivityListViewProps {
  groupedActivities: Record<string, Activity[]>;
}

export default function ActivityListView({
  groupedActivities,
}: ActivityListViewProps) {
  const router = useRouter();

  return (
    <Stack spacing={2}>
      {Object.entries(groupedActivities).map(([denom, acts]) => (
        <Stack direction="row" spacing={8} key={denom} alignItems="flex-start">
          <Button
            onClick={() => router.push(`/wallet/token?id=${denom}`)}
            sx={{
              mb: 1,
              boxShadow: "none",
              bgcolor: "transparent",
              verticalAlign: "top",
              alignSelf: "flex-start",
              mt: 1,
            }}
          >
            <InfoIcon></InfoIcon> {` ${denom}`}
          </Button>
          <Accordion
            key={denom}
            sx={{
              mb: 1,
              boxShadow: "none",
              bgcolor: "transparent",
              width: "100%",
              ml: 2,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${denom}-content`}
              id={`${denom}-header`}
              sx={{ px: 0, bgcolor: "transparent" }}
            >
              <Typography variant="subtitle2" sx={{ color: "#1e88e5" }}>
                Activity
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0 }}>
              {acts.map((activity, idx) => (
                <Box key={idx} sx={{ mb: 1, ml: 2, mr: 2 }}>
                  <Typography variant="body2" color="#212529">
                    {activity.type} {activity.coin}
                  </Typography>
                  <Typography variant="caption" color="#90a4ae">
                    {activity.type === "received" ? "+" : "-"}$
                    {activity.amount.toLocaleString()} &nbsp; • &nbsp;{" "}
                    {activity.date}
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Stack>
      ))}
    </Stack>
  );
}
