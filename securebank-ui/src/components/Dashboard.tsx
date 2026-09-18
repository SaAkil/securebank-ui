import { useEffect, useState } from "react";
import AccountList from "./AccountList";
import Panel from "./Panel";
import TransferForm from "./TransferForm";
import useAccounts from "../hooks/useAccounts";

function Dashboard() {
  const { accounts, loading, error } = useAccounts();

  const [localAccounts, setLocalAccounts] = useState(accounts);

  useEffect(() => {
    setLocalAccounts(accounts);
  }, [accounts]);

  const displayAccounts =
    localAccounts.length > 0 ? localAccounts : accounts;

  const totalBalance = displayAccounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  useEffect(() => {
    const oldTitle = document.title;

    document.title = `SecureBank - Total $${totalBalance.toFixed(2)}`;

    return () => {
      document.title = oldTitle;
    };
  }, [totalBalance]);

  function handleDeposit(id: number) {
    setLocalAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === id
          ? { ...account, balance: account.balance + 100 }
          : account
      )
    );
  }

  function handleTransfer(
    sourceId: number,
    destinationId: number,
    amount: number
  ) {
    setLocalAccounts((currentAccounts) =>
      currentAccounts.map((account) => {
        if (account.id === sourceId) {
          return {
            ...account,
            balance: account.balance - amount,
          };
        }

        if (account.id === destinationId) {
          return {
            ...account,
            balance: account.balance + amount,
          };
        }

        return account;
      })
    );
  }

  if (loading) {
    return <main><h1>Loading SecureBank...</h1></main>;
  }

  if (error) {
    return <main><h1>{error}</h1></main>;
  }

  return (
    <main>
      <h1>SecureBank Dashboard</h1>

      <p>Total Balance: ${totalBalance.toFixed(2)}</p>

      <Panel>
        <h2>My Accounts</h2>

        <AccountList
          accounts={displayAccounts}
          onDeposit={handleDeposit}
        />
      </Panel>

      <Panel>
        <TransferForm
          accounts={displayAccounts}
          onTransfer={handleTransfer}
        />
      </Panel>
    </main>
  );
}

export default Dashboard;