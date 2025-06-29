import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

interface Activity {
  coin: string;
  amount: number;
  date: string;
  type: "received" | "sent";
}

interface ActivityListViewProps {
  groupedActivities: Record<string, Activity[]>;
}

export default function ActivityListView({ groupedActivities }: ActivityListViewProps) {
  return (
    <Stack spacing={2}>
      {Object.entries(groupedActivities).map(([denom, acts]) => (
        <Accordion
          key={denom}
          sx={{ mb: 1, boxShadow: "none", bgcolor: "transparent" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${denom}-content`}
            id={`${denom}-header`}
            sx={{ px: 0, bgcolor: "transparent" }}
          >
            <Typography variant="subtitle2" sx={{ color: "#1e88e5" }}>
              {denom}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0 }}>
            {acts.map((activity, idx) => (
              <Box key={idx}>
                <Typography variant="body2" color="#212529">
                  {activity.type === "received" ? "Received" : "Sent"}{" "}
                  {activity.coin}
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
      ))}
    </Stack>
  );
}
