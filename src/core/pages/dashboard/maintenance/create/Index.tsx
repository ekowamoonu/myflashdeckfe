import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
//import { Card, CardHeader, CardContent } from "@/components/ui/card";
import DashboardTitle from "@/core/shared-components/DashboardTitle";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Index = () => {
  const form = useForm();

  return (
    <>
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
                  name="photo"
                  render={({ field }) => (
                    <FormItem className="space-y-1 mb-2">
                      <FormLabel>Vehicle Photo</FormLabel>
                      <FormControl>
                        <Input type="file" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="mt-6">
                  <CheckCircle /> Add Vehicle
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Index;
