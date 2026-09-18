import type { Account } from "../data/seed";
import AccountCard from "./AccountCard";
import styles from "./AccountList.module.css";

type AccountListProps = {
  accounts: Account[];
  onDeposit: (id: number) => void;
};

function AccountList({ accounts, onDeposit }: AccountListProps) {
  return (
    <div className={styles.list}>
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onDeposit={onDeposit}
        />
      ))}
    </div>
  );
}

export default AccountList;