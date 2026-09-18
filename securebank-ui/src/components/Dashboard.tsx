import { useEffect, useState } from "react";
import AccountList from "./AccountList";
import Panel from "./Panel";
import TransferForm from "./TransferForm";
import useAccounts from "../hooks/useAccounts";
import styles from "./Dashboard.module.css";

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
    const previousTitle = document.title;

    document.title = `SecureBank • Total $${totalBalance.toFixed(2)}`;

    return () => {
      document.title = previousTitle;
    };
  }, [totalBalance]);

  function handleDeposit(id: number) {
    setLocalAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === id
          ? {
              ...account,
              balance: account.balance + 100,
            }
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
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.loading}>Loading SecureBank...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.error}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>SecureBank</h1>

          <p className={styles.subtitle}>
            Account overview and money transfers
          </p>

          <div className={styles.total}>
            Total Balance: ${totalBalance.toFixed(2)}
          </div>
        </header>

        <Panel>
          <h2 className={styles.title}>My Accounts</h2>

          <AccountList
            accounts={displayAccounts}
            onDeposit={handleDeposit}
          />
        </Panel>

        <Panel>
          <h2 className={styles.title}>Transfer Money</h2>

          <TransferForm
            accounts={displayAccounts}
            onTransfer={handleTransfer}
          />
        </Panel>
      </div>
    </div>
  );
}

export default Dashboard;