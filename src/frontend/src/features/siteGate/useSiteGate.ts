import { useEffect, useState } from "react";

const STORAGE_KEY = "site_gate_unlocked";
const VALID_USERNAME = "Ralgo";
const VALID_PASSWORD = "001";

interface SiteGateState {
  isUnlocked: boolean;
  isLoading: boolean;
}

export function useSiteGate() {
  const [state, setState] = useState<SiteGateState>({
    isUnlocked: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check sessionStorage on mount
    const unlocked = sessionStorage.getItem(STORAGE_KEY) === "true";
    setState({ isUnlocked: unlocked, isLoading: false });
  }, []);

  const attemptUnlock = (username: string, password: string): boolean => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setState({ isUnlocked: true, isLoading: false });
      return true;
    }
    return false;
  };

  const unlock = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setState({ isUnlocked: true, isLoading: false });
  };

  const lock = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setState({ isUnlocked: false, isLoading: false });
  };

  return {
    isUnlocked: state.isUnlocked,
    isLoading: state.isLoading,
    attemptUnlock,
    unlock,
    lock,
  };
}
