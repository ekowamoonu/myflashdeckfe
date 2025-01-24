import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { processApiCallErrors } from "@/core/helpers/helpers";
import { IVehicleProfile } from "@/core/interfaces/IVehicleProfile";
import DashboardTitle from "@/core/shared-components/DashboardTitle";
import Loader from "@/core/shared-components/Loader";
import axios from "axios";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vehicleProfiles, setVehicleProfiles] = useState<IVehicleProfile[]>([]);

  useEffect(() => {
    const getVehicleProfiles = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<IVehicleProfile[]>(
          "/vehicle-profiles"
        );
        setVehicleProfiles(response.data);
      } catch (error) {
        processApiCallErrors(error);
      } finally {
        setIsLoading(false);
      }
    };

    getVehicleProfiles();
  }, []);

  return (
    <>
      <ToastContainer />
      <DashboardTitle>Vehicle Profiles</DashboardTitle>
      <div className="bg-white mt-6 p-6 rounded-md">
        <div className="flex justify-end">
          <Button asChild size="lg">
            <Link to="/vehicle-profiles/create">
              <CirclePlus /> Add New
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <p className="mt-6 flex items-center justify-center">
            <Loader />
          </p>
        ) : vehicleProfiles.length > 0 ? (
          vehicleProfiles.map(() => {
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
                <Link to="/vehicle-profiles/details/1">
                  <Card className="hover:border-slate-700">
                    <CardHeader className="p-0 aspect-square bg-[#eee] rounded-tl-md rounded-tr-md overflow-hidden">
                      <img src="/images/car1.avif" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="font-bold mb-2 text-slate-800">
                        Red Ferrari
                      </p>
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
              </div>
            );
          })
        ) : (
          <p className="mt-6 text-center">No vehicle profiles found</p>
        )}
      </div>
    </>
  );
};

export default Index;
