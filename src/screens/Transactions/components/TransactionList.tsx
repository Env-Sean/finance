import React from "react";
import { Button } from "../../../components/ui/button";

interface Transaction {
  id: string;
  type: string;
  category: string;
  amount: number;
  description: string;
  reference: string;
  transaction_date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-colortext-2">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-graygray-3 bg-graygray-2">
            <th className="table-header">
              Date
            </th>
            <th className="table-header">
              Type
            </th>
            <th className="table-header">
              Category
            </th>
            <th className="table-header">
              Description
            </th>
            <th className="table-header">
              Reference
            </th>
            <th className="table-header text-right">
              Amount
            </th>
            <th className="table-header">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="table-row"
            >
              <td className="table-cell text-text-colortext-2">
                {formatDate(transaction.transaction_date)}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={transaction.type === "income" ? "status-badge-success" : "status-badge-error"}
                >
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </span>
              </td>
              <td className="table-cell">
                {transaction.category}
              </td>
              <td className="table-cell text-text-colortext-2">
                {transaction.description}
              </td>
              <td className="table-cell text-text-colortext-2">
                {transaction.reference}
              </td>
              <td
                className={`px-6 py-4 text-sm font-semibold text-right ${
                  transaction.type === "income"
                    ? "transaction-income"
                    : "transaction-expense"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm">
                <Button
                  onClick={() => onDelete(transaction.id)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 text-xs"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
