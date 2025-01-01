import DashboardTitle from "@/core/shared-components/DashboardTitle";
import { columns, ExpenseRecord } from "./table/columns";
import { DataTable } from "./table/data-table";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const expenseRecords: ExpenseRecord[] = [
    {
      id: 2,
      amount: 25,
      category: "Oil change",
      comments: "Was too expensive",
      expenseDate: "1st January, 2025",
      createdAt: "31st December, 2024",
    },
    {
      id: 2,
      amount: 25,
      category: "Oil change",
      comments: "Was too expensive",
      expenseDate: "1st January, 2025",
      createdAt: "31st December, 2024",
    },
    {
      id: 2,
      amount: 25,
      category: "Oil change",
      comments: "Was too expensive",
      expenseDate: "1st January, 2025",
      createdAt: "31st December, 2024",
    },
  ];

  return (
    <>
      <DashboardTitle>Expenses</DashboardTitle>
      <div className="bg-white mt-6 p-6 rounded-md">
        <div className="flex justify-end mb-6 ">
          <Button asChild size="lg">
            <Link to="/expenses/create">
              <CirclePlus /> Add New Expense Record
            </Link>
          </Button>
        </div>
        <DataTable columns={columns} data={expenseRecords} />
      </div>
    </>
  );
};

export default Index;
