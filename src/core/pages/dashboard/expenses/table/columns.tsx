import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

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

export const columns: ColumnDef<ExpenseRecord>[] = [
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
  },
  {
    accessorKey: "isMaintenanceExpense",
    header: "Maintenance",
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
      console.log(row);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="hover:bg-slate-800 hover:text-white"
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              <Link to="/expenses/details/1"> Edit record</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Delete record
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
