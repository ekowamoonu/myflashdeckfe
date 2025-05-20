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
        const response = await axios.get<{ data: IVehicleProfile[] }>(
          "/vehicle-profiles"
        );
        setVehicleProfiles(response.data.data);
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
            {vehicleProfiles.length > 0 ? (
              vehicleProfiles.map((vehicleProfile) => {
                return (
                  <Link
                    to={"/vehicle-profiles/details/" + vehicleProfile.id}
                    key={vehicleProfile.id}
                  >
                    <Card className="hover:border-slate-700  rounded-tl-xl rounded-tr-xl overflow-hidden">
                      <CardHeader className="p-0 aspect-square bg-[#eee]">
                        <img src={vehicleProfile.photosOfVehicle} />
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="font-bold mb-2 text-slate-800">
                          {vehicleProfile.name}
                        </p>
                        <p className="mb-1">{vehicleProfile.make}</p>
                        <p>
                          Model Year: <i>{vehicleProfile.modelYear}</i>
                        </p>
                        <p>
                          Added: <i>{vehicleProfile.createdAtFormatted}</i>
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            ) : (
              <p className="mt-6 text-center">No vehicle profiles found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
