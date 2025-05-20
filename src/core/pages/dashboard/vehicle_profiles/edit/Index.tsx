import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { processApiCallErrors } from "@/core/helpers/helpers";
import { IVehicleProfile } from "@/core/interfaces/IVehicleProfile";
//import { Card, CardHeader, CardContent } from "@/components/ui/card";
import DashboardTitle from "@/core/shared-components/DashboardTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowLeft, Loader, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  make: z.string().nullable(),
  modelYear: z.string().nullable(),
  licensePlate: z.string().nullable(),
  photoOfVehicle: z.any(),
});

const Index = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      make: null,
      modelYear: null,
      licensePlate: null,
      photoOfVehicle: null,
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFetchingVehicleProfile, setIsFetchingVehicleProfile] =
    useState<boolean>(false);
  const [isUpdatingVehicleProfile, setIsUpdatingVehicleProfile] =
    useState<boolean>(false);
  const [vehicleProfile, setVehicleProfile] = useState<IVehicleProfile | null>(
    null
  );

  const { id } = useParams();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUpdatingVehicleProfile(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("make", values.make ?? "");
    formData.append("modelYear", values.modelYear ?? "");
    formData.append("licensePlate", values.licensePlate ?? "");
    if (selectedFile) {
      formData.append("photoOfVehicle", selectedFile);
    }
    try {
      await axios.patch("/vehicle-profiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast("Vehicle profile created successfully", { type: "success" });
      form.reset();
    } catch (error) {
      processApiCallErrors(error);
    } finally {
      setIsUpdatingVehicleProfile(false);
    }
  }

  useEffect(() => {
    const getVehicleProfileDetails = async () => {
      try {
        setIsFetchingVehicleProfile(true);
        const response = await axios.get<{ data: IVehicleProfile }>(
          "/vehicle-profiles/" + id
        );
        const vehicleProfile = response.data.data;
        form.setValue("name", vehicleProfile.name);
        form.setValue("make", vehicleProfile.make);
        form.setValue("modelYear", vehicleProfile.modelYear);
        form.setValue("licensePlate", vehicleProfile.licensePlate);
        form.setValue("name", vehicleProfile.name);
        setVehicleProfile(vehicleProfile);
        toast("Vehicle profile details fetched successfully", {
          type: "success",
        });
      } catch (error) {
        processApiCallErrors(error);
      } finally {
        setIsFetchingVehicleProfile(false);
      }
    };

    getVehicleProfileDetails();
  }, [id, form]);

  return (
    <>
      <DashboardTitle>Edit Vehicle</DashboardTitle>
      <div className="bg-white mt-6 p-6 rounded-md">
        <div className="flex">
          <Button asChild size="lg" variant="secondary">
            <Link to="/vehicle-profiles">
              {" "}
              <ArrowLeft /> Back to All Vehicles
            </Link>
          </Button>
        </div>
        <div className="mt-6">
          {isFetchingVehicleProfile ? (
            <p className="mt-6 flex items-center justify-center">
              <Loader />
            </p>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-3  gap-10">
                  <div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-1 mb-2">
                          <FormLabel>Vehicle name</FormLabel>
                          <FormControl>
                            <Input
                              className="mt-[100px]"
                              placeholder="Red Ferrari"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="make"
                      render={({ field }) => (
                        <FormItem className="space-y-1 mb-2">
                          <FormLabel>Make</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="S8970"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="modelYear"
                      render={({ field }) => (
                        <FormItem className="space-y-1 mb-2">
                          <FormLabel>Model Year</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="2024"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem className="space-y-1 mb-2">
                          <FormLabel>License Plate</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="GX-183847"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <div className="aspect-square bg-[#eee] mt-6 rounded-md overflow-hidden">
                      <img src={vehicleProfile?.photosOfVehicle} />
                    </div>

                    <FormField
                      control={form.control}
                      name="photoOfVehicle"
                      render={({ field }) => (
                        <FormItem className="space-y-1 mb-2 mt-6">
                          <FormLabel>Change Photo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              {...field}
                              onChange={handleFileChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {isUpdatingVehicleProfile ? (
                      <Button disabled className="mt-6">
                        <Loader className="animate-spin" />
                        Save Changes
                      </Button>
                    ) : (
                      <Button type="submit" className="mt-6">
                        <Save /> Save Changes
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
