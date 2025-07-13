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
import { GroupActivity } from "./transactions";

interface ActivityListViewProps {
  groupedActivities: GroupActivity[];
}

export default function ActivityListView({
  groupedActivities,
}: ActivityListViewProps) {
  const router = useRouter();

  return (
    <Stack spacing={2}>
      {groupedActivities.map((group) => (
        <Stack
          direction="row"
          spacing={8}
          key={group.id}
          alignItems="flex-start "
          sx={{
            ml: 0,
            p: 2,
          }}
        >
          <Button
            onClick={() =>
              router.push(
                `/wallet/token?id=${group.id}&coin=${group.coin}&totalSupply=${group.totalSupply}`,
              )
            }
            sx={{
              mb: 1,
              boxShadow: "none",
              bgcolor: "transparent",
              verticalAlign: "top",
              alignSelf: "flex-start",
              mt: 1,
            }}
          >
            <InfoIcon></InfoIcon> {` ${group.coin}`}
          </Button>
          <Accordion
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
              aria-controls={`${group.id}-content`}
              id={`${group.id}-header`}
              sx={{ px: 0, bgcolor: "transparent" }}
            >
              <Typography variant="subtitle2" sx={{ color: "#1e88e5" }}>
                Activity
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0 }}>
              {group.activities.map((activity, idx) => (
                <Box key={idx} sx={{ mb: 1, ml: 2, mr: 2 }}>
                  <Typography variant="body2" color="#212529">
                    {activity.type} {group.coin}
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
