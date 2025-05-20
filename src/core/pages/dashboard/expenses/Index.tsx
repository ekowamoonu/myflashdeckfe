import DashboardTitle from "@/core/shared-components/DashboardTitle";
import { columns, ExpenseRecord } from "./table/columns";
import { DataTable } from "./table/data-table";
import { Button } from "@/components/ui/button";
import { CirclePlus, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { processApiCallErrors } from "@/core/helpers/helpers";
import axios from "axios";

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[]>([]);

  useEffect(() => {
    const getExpenseRecords = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<{ data: ExpenseRecord[] }>(
          "/expenses"
        );
        setExpenseRecords(response.data.data);
      } catch (error) {
        processApiCallErrors(error);
      } finally {
        setIsLoading(false);
      }
    };

    getExpenseRecords();
  }, []);

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
        {isLoading ? (
          <p className="mt-6 flex items-center justify-center">
            <Loader />
          </p>
        ) : (
          <DataTable columns={columns} data={expenseRecords} />
        )}
      </div>
    </>
  );
};

export default Index;
