import { useState } from "react";
import type { Account } from "../data/seed";
import styles from "./TransferForm.module.css";

type TransferFormProps = {
  accounts: Account[];
  onTransfer: (
    sourceId: number,
    destinationId: number,
    amount: number
  ) => void;
};

function TransferForm({ accounts, onTransfer }: TransferFormProps) {
  const [sourceId, setSourceId] = useState<number>(accounts[0]?.id ?? 0);
  const [destinationId, setDestinationId] = useState<number>(
    accounts[1]?.id ?? 0
  );
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const transferAmount = Number(amount);

    if (transferAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    if (sourceId === destinationId) {
      setError("Source and destination must be different.");
      return;
    }

    setError("");
    onTransfer(sourceId, destinationId, transferAmount);
    setAmount("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>From</label>

        <select
          className={styles.select}
          value={sourceId}
          onChange={(event) => setSourceId(Number(event.target.value))}
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.owner} - {account.kind} ($
              {account.balance.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>To</label>

        <select
          className={styles.select}
          value={destinationId}
          onChange={(event) =>
            setDestinationId(Number(event.target.value))
          }
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.owner} - {account.kind} ($
              {account.balance.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Amount</label>

        <input
          className={styles.input}
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          min="0"
          step="0.01"
          placeholder="Enter amount"
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} type="submit">
        Transfer Money
      </button>
    </form>
  );
}

export default TransferForm;