import DashboardTitle from "@/core/shared-components/DashboardTitle";
import { columns, FuelRecord } from "./table/columns";
import { DataTable } from "./table/data-table";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const fuelRecords: FuelRecord[] = [
    {
      id: 2,
      amount: 25,
      litres: "Oil change",
      purchaseDate: "1st January, 2025",
      createdAt: "31st December, 2024",
    },
    {
      id: 3,
      amount: 25,
      litres: "Oil change",
      purchaseDate: "1st January, 2025",
      createdAt: "31st December, 2024",
    },
    {
      id: 4,
      amount: 25,
      litres: "Oil change",
      purchaseDate: "1st January, 2025",
      createdAt: "31st December, 2024",
    },
  ];

  return (
    <>
      <DashboardTitle>Fuel Purchases Records</DashboardTitle>
      <div className="bg-white mt-6 p-6 rounded-md">
        <div className="flex justify-end mb-6 ">
          <Button asChild size="lg">
            <Link to="/fuel-tracking/create">
              <CirclePlus /> Add New Record
            </Link>
          </Button>
        </div>
        <DataTable columns={columns} data={fuelRecords} />
      </div>
    </>
  );
};

export default Index;
