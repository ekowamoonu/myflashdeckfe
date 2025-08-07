import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { Link } from "react-router-dom";
import DeleteExpense from "./components/DeleteExpense";
import { Edit } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export type ExpenseRecord = {
  id: number;
  amount: number;
  category: string;
  isFuelExpense: string;
  isMaintenanceExpense: string;
  litresOfFuelPurchased: number;
  comments: string;
  expenseDateFormatted: string;
  createdAtFormatted: string;
};

export const columns = ({
  onDelete,
}: {
  onDelete: (id: number) => void;
}): ColumnDef<ExpenseRecord>[] => [
  {
    accessorKey: "id",
    header: "ID#",
  },
  {
    accessorKey: "amount",
    header: "Amount ($)",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "isFuelExpense",
    header: "Fuel",
    cell: ({ row }) => {
      return (
        <Fragment>
          {String(row.original.isFuelExpense) === "1" ? "Yes" : "No"}
        </Fragment>
      );
    },
  },
  {
    accessorKey: "isMaintenanceExpense",
    header: "Maintenance",
    cell: ({ row }) => {
      return (
        <Fragment>
          {String(row.original.isMaintenanceExpense) === "1" ? "Yes" : "No"}
        </Fragment>
      );
    },
  },
  {
    accessorKey: "litresOfFuelPurchased",
    header: "Litres of fuel (L)",
  },
  {
    accessorKey: "comments",
    header: "Comments",
  },
  {
    accessorKey: "expenseDateFormatted",
    header: "Expense date",
  },
  {
    accessorKey: "createdAtFormatted",
    header: "Recorded on",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      // console.log(row);
      return (
        <div className="flex gap-2">
          <Button asChild size="icon" variant={"outline"}>
            <Link to={`/expenses/details/${row.original.id}`}>
              {" "}
              <Edit />
            </Link>
          </Button>
          <DeleteExpense id={row.original.id} onDelete={onDelete} />
        </div>
      );
    },
  },
];
