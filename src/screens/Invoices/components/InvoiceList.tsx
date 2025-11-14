import React from "react";
import { Button } from "../../../components/ui/button";

interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  amount: number;
  vat_amount: number;
  total_amount: number;
  status: string;
  due_date: string;
  paid_date: string | null;
}

interface InvoiceListProps {
  invoices: Invoice[];
  onMarkAsPaid: (id: string) => void;
  onMarkAsUnpaid: (id: string) => void;
  onDelete: (id: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "status-badge-success";
    case "sent":
      return "status-badge-pending";
    case "overdue":
      return "status-badge-error";
    default:
      return "status-badge-warning";
  }
};

export const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  onMarkAsPaid,
  onMarkAsUnpaid,
  onDelete,
}) => {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-colortext-2">No invoices yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-graygray-3 bg-graygray-2">
            <th className="table-header">
              Invoice #
            </th>
            <th className="table-header">
              Client
            </th>
            <th className="table-header text-right">
              Amount
            </th>
            <th className="table-header text-right">
              VAT
            </th>
            <th className="table-header text-right">
              Total
            </th>
            <th className="table-header">
              Status
            </th>
            <th className="table-header">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="table-row"
            >
              <td className="table-cell font-medium">
                {invoice.invoice_number}
              </td>
              <td className="table-cell text-text-colortext-2">
                {invoice.client_name}
              </td>
              <td className="table-cell text-right">
                ${invoice.amount.toFixed(2)}
              </td>
              <td className="table-cell text-right">
                ${invoice.vat_amount.toFixed(2)}
              </td>
              <td className="table-cell text-right font-semibold">
                ${invoice.total_amount.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={getStatusColor(invoice.status)}
                >
                  {invoice.status.charAt(0).toUpperCase() +
                    invoice.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm space-x-2">
                {invoice.status === "paid" ? (
                  <Button
                    onClick={() => onMarkAsUnpaid(invoice.id)}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    Mark Unpaid
                  </Button>
                ) : (
                  <Button
                    onClick={() => onMarkAsPaid(invoice.id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  >
                    Mark Paid
                  </Button>
                )}
                <Button
                  onClick={() => onDelete(invoice.id)}
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
