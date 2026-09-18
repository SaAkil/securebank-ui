import { useEffect, useState } from "react";
import { ACCOUNTS, type Account } from "../data/seed";

function useAccounts() {
  console.log("useAccounts started");

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Starting timer");

    const timer = setTimeout(() => {
      console.log("Timer finished");
      setAccounts(ACCOUNTS);
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return {
    accounts,
    loading,
  };
}

export default useAccounts;