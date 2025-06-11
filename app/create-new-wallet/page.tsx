"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { store } from "../../lib/store/store";
import { useEffect } from "react";

// Fetch all seed phrases from the tauri store
async function fetchSeedsFromStore() {
  // This assumes you store them under a key like "seedPhrases" as an array of objects
  // Adjust the key and structure as needed for your app
  return await store().get<{ id: string; label: string }[]>("seedPhrases");
}

export default function CreateNewWalletPage() {
  const router = useRouter();

  // Add a special id for "create new"
  const CREATE_NEW_ID = "__create_new__";
  const [existingSeeds, setExistingSeeds] = React.useState<{ id: string; label: string }[]>([]);
  const [selectedSeed, setSelectedSeed] = React.useState<string>(CREATE_NEW_ID);

  useEffect(() => {
    async function loadSeeds() {
      const seeds = await fetchSeedsFromStore();
      if (Array.isArray(seeds) && seeds.length > 0) {
        setExistingSeeds(seeds);
        // Always default to "create new" option
        setSelectedSeed(CREATE_NEW_ID);
      } else {
        setExistingSeeds([]);
        setSelectedSeed(CREATE_NEW_ID);
      }
    }
    loadSeeds();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: "100%",
          p: 4,
          boxShadow: 4,
          background: "linear-gradient(135deg, #212529 60%, #1e88e5 100%)",
          color: "#fff",
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ minWidth: 0, color: "#1e88e5", bgcolor: "#fff", "&:hover": { bgcolor: "#e3f2fd" } }}
          >
            Back
          </Button>
          <Box sx={{ flex: 1 }} />
          <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "right", color: "#fff" }}>
            Create New Wallet
          </Typography>
        </Stack>
        <Typography sx={{ mb: 3, color: "#fff" }}>
          Select an existing seed phrase or create a new one.
        </Typography>
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <RadioGroup
            value={selectedSeed}
            onChange={(e) => setSelectedSeed(e.target.value)}
          >
            <List sx={{ bgcolor: "transparent", color: "#fff", p: 0 }}>
              {existingSeeds.map((seed) => (
                <ListItem
                  key={seed.id}
                  disableGutters
                  sx={{
                    bgcolor: selectedSeed === seed.id ? "#1e88e5" : "transparent",
                    borderRadius: 2,
                    mb: 1,
                    px: 1,
                  }}
                >
                  <FormControlLabel
                    value={seed.id}
                    control={<Radio sx={{
                      color: "#fff",
                      "&.Mui-checked": { color: "#fff" }
                    }} />}
                    label={<ListItemText primary={seed.label} />}
                    sx={{ flex: 1, m: 0, color: "#fff" }}
                  />
                </ListItem>
              ))}
              {/* Always show the create new option */}
              <ListItem
                key={CREATE_NEW_ID}
                disableGutters
                sx={{
                  bgcolor: selectedSeed === CREATE_NEW_ID ? "#1e88e5" : "transparent",
                  borderRadius: 2,
                  mb: 1,
                  px: 1,
                }}
              >
                <FormControlLabel
                  value={CREATE_NEW_ID}
                  control={<Radio sx={{
                    color: "#fff",
                    "&.Mui-checked": { color: "#fff" }
                  }} />}
                  label={<ListItemText primary="+ Create New Seed Phrase" />}
                  sx={{ flex: 1, m: 0, color: "#fff" }}
                />
              </ListItem>
            </List>
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: "#fff",
            color: "#1e88e5",
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: 2,
            "&:hover": { bgcolor: "#e3f2fd" },
          }}
          onClick={() => {
            if (selectedSeed === CREATE_NEW_ID) {
              router.push("/create");
            } else {
              alert(`Use seed: ${selectedSeed} (not implemented)`);
            }
          }}
          disabled={!selectedSeed}
        >
          Continue
        </Button>
      </Card>
    </Box>
  );
}
