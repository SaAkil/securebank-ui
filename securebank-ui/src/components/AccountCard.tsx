import type { Account } from "../data/seed";
import styles from "./AccountCard.module.css";

type AccountCardProps = {
  account: Account;
  onDeposit: (id: number) => void;
};

function AccountCard({ account, onDeposit }: AccountCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.owner}>{account.owner}</h3>

      <p className={styles.kind}>{account.kind}</p>

      <p className={styles.balanceLabel}>Current balance</p>

      <p className={styles.balance}>
        ${account.balance.toFixed(2)}
      </p>

      {account.balance < 0 && (
        <span className={styles.overdrawn}>Overdrawn</span>
      )}

      <button
        className={styles.button}
        onClick={() => onDeposit(account.id)}
      >
        Deposit $100
      </button>
    </article>
  );
}

export default AccountCard;