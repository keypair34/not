

import React, { createContext, useContext, useState, useEffect } from "react";

type AppLockContextType = {
  locked: boolean;
  lock: () => void;
  unlock: () => void;
};

const AppLockContext = createContext<AppLockContextType>({
  locked: false,
  lock: () => {},
  unlock: () => {},
});

export function AppLockProvider({ children }: { children: React.ReactNode }) {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocked(window.localStorage.getItem("wallet_locked") === "true");
    }
  }, []);

  const lock = () => {
    setLocked(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("wallet_locked", "true");
    }
  };

  const unlock = () => {
    setLocked(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("wallet_locked");
    }
  };

  return (
    <AppLockContext.Provider value={{ locked, lock, unlock }}>
      {children}
    </AppLockContext.Provider>
  );
}

export function useAppLock() {
  return useContext(AppLockContext);
}
