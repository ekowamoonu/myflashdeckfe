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

export type FuelRecord = {
  id: number;
  amount: number;
  litres: string;
  purchaseDate: string;
  createdAt: string;
};

export const columns: ColumnDef<FuelRecord>[] = [
  {
    accessorKey: "id",
    header: "ID#",
  },
  {
    accessorKey: "amount",
    header: "Amount ($)",
  },
  {
    accessorKey: "litres",
    header: "Liters",
  },
  {
    accessorKey: "purchaseDate",
    header: "Purchase date",
  },
  {
    accessorKey: "createdAt",
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
              <Link to="/fuel-tracking/details/1"> Edit record</Link>
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
