export type Account = {
  id: number;
  owner: string;
  kind: "checking" | "savings";
  balance: number;
};

export const ACCOUNTS: Account[] = [
  { id: 1, owner: "Sara", kind: "checking", balance: 2430.11 },
  { id: 2, owner: "Sara", kind: "savings", balance: 9800.00 },
  { id: 3, owner: "Devon", kind: "checking", balance: -42.50 },
];

export const TRANSACTIONS = [
  { id: 101, accountId: 1, type: "debit", amount: 54.20, memo: "Grocery" },
  { id: 102, accountId: 1, type: "credit", amount: 3000.00, memo: "Salary" },
  { id: 103, accountId: 2, type: "credit", amount: 500.00, memo: "Savings sweep" },
  { id: 104, accountId: 3, type: "debit", amount: 12.99, memo: "Streaming" },
];