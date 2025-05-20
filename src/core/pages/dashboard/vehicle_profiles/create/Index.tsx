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
//import { Card, CardHeader, CardContent } from "@/components/ui/card";
import DashboardTitle from "@/core/shared-components/DashboardTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  make: z.string(),
  modelYear: z.string(),
  licensePlate: z.string(),
  photoOfVehicle: z.any(),
});

const Index = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      make: "",
      modelYear: "",
      licensePlate: "",
    },
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCreating(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("make", values.make);
    formData.append("modelYear", values.modelYear);
    formData.append("licensePlate", values.licensePlate);
    if (selectedFile) {
      formData.append("photoOfVehicle", selectedFile);
    }

    try {
      await axios.post("/vehicle-profiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast("Vehicle profile created successfully", { type: "success" });
      form.reset();
    } catch (error) {
      processApiCallErrors(error);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <DashboardTitle>Add New Vehicle</DashboardTitle>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-6">
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
                          <Input placeholder="S8970" {...field} />
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
                          <Input placeholder="2024" {...field} />
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
                          <Input placeholder="GX-183847" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="photoOfVehicle"
                    render={({ field }) => (
                      <FormItem className="space-y-1 mb-2">
                        <FormLabel>Vehicle Photo</FormLabel>
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
                  {isCreating ? (
                    <Button disabled className="mt-6">
                      <Loader2 className="animate-spin" />
                      Add Vehicle
                    </Button>
                  ) : (
                    <Button type="submit" className="mt-6">
                      <CheckCircle /> Add Vehicle
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Index;
