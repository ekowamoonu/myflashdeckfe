import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import DashboardTitle from "@/core/shared-components/DashboardTitle";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <DashboardTitle>Vehicle Profiles</DashboardTitle>
      <div className="bg-white mt-6 p-6 rounded-md">
        <div className="flex justify-end">
          <Button asChild size="lg">
            <Link to="/vehicle-profiles/create">
              <CirclePlus /> Add New
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          {dummyData.map(() => {
            return (
              <Link to="/vehicle-profiles/details/1">
                <Card className="hover:border-slate-700">
                  <CardHeader className="p-0 aspect-square bg-[#eee] rounded-tl-md rounded-tr-md overflow-hidden">
                    <img src="/images/car1.avif" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="font-bold mb-2 text-slate-800">Red Ferrari</p>
                    <p className="mb-1">Model SF90</p>
                    <p>
                      Year: <i>2025</i>
                    </p>
                    <p>
                      Added: <i>26/12/2024</i>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;
