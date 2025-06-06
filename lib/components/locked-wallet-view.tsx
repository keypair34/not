import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { store } from "../store/store";
import { useAppLock } from "../context/app-lock-context";

type LockedWalletViewProps = {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
};

export default function LockedWalletView({
  showPassword,
  setShowPassword,
}: LockedWalletViewProps) {
  const [passwordInput, setPasswordInput] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const { unlock } = useAppLock();

  const handleUnlock = async () => {
    setError(null);
    // Optimistically unlock immediately, then check password
    unlock();
    const stored = await store().get<string>("password");
    if (stored && stored === passwordInput) {
      setPasswordInput("");
      return;
    }
    setError("Incorrect password. Please try again.");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f6fa",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Box
            sx={{
              mt: 3,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LockIcon sx={{ fontSize: 40, color: "#1e88e5", mb: 1 }} />
            <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
              Wallet Locked
            </Typography>
            <TextField
              label="Enter Password"
              type={showPassword ? "text" : "password"}
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setError(null);
              }}
              sx={{ mb: 1, bgcolor: "#f3f4f6", borderRadius: 2, width: "100%" }}
              error={!!error}
              helperText={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <LockIcon color="primary" />
                      ) : (
                        <LockIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
              disabled={!passwordInput}
              onClick={handleUnlock}
            >
              Unlock Wallet
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
