import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
//import { Card, CardHeader, CardContent } from "@/components/ui/card";
import DashboardTitle from "@/core/shared-components/DashboardTitle";
import { ArrowLeft, CalendarIcon, CheckCircle, Loader2 } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { processApiCallErrors } from "@/core/helpers/helpers";
import { useEffect, useState } from "react";
import { IVehicleProfile } from "@/core/interfaces/IVehicleProfile";

const formSchema = z.object({
  vehicleProfileId: z.string(),
  category: z.string(),
  amount: z.string(),
  isFuelExpense: z.string(),
  isMaintenanceExpense: z.string(),
  litresOfFuelPurchased: z.number(),
  comments: z.string(),
  expenseDate: z.date(),
});

const Index = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleProfileId: "",
      category: "",
      amount: "0",
      isFuelExpense: "0",
      isMaintenanceExpense: "0",
      litresOfFuelPurchased: 0,
      comments: "",
      expenseDate: new Date(),
    },
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [vehicleProfiles, setVehicleProfiles] = useState<IVehicleProfile[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const isFuelExpenseWatch = useWatch({
    control: form.control,
    name: "isFuelExpense",
  });
  const isMaintenanceExpenseWatch = useWatch({
    control: form.control,
    name: "isMaintenanceExpense",
  });

  async function getCategories() {
    try {
      const response = await axios.get<{ data: string[] }>("/categories");
      // form.setValue("category", response.data.data[0].id);
      setCategories(response.data.data);
    } catch (error) {
      processApiCallErrors(error);
    }
  }
  async function getVehicleProfiles() {
    try {
      const response = await axios.get<{ data: IVehicleProfile[] }>(
        "/vehicle-profiles"
      );
      setVehicleProfiles(response.data.data);
    } catch (error) {
      processApiCallErrors(error);
    }
  }

  useEffect(() => {
    getCategories();
    getVehicleProfiles();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCreating(true);
    try {
      await axios.post("/expenses", values);
      toast("Expense record created successfully", { type: "success" });
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
      <DashboardTitle>Add New Expense Record</DashboardTitle>
      <div className="bg-white mt-6 p-6 rounded-md">
        <div className="flex">
          <Button asChild size="lg" variant="secondary">
            <Link to="/expenses">
              {" "}
              <ArrowLeft /> Back to All Expenses
            </Link>
          </Button>
        </div>
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-10">
                <div>
                  <FormField
                    control={form.control}
                    name="vehicleProfileId"
                    render={({ field }) => (
                      <FormItem className="space-y-1 mb-2">
                        <FormLabel>Vehicle profile</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a vehicle profile" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicleProfiles.map((vehicleProfile) => (
                              <SelectItem
                                key={vehicleProfile.id}
                                value={String(vehicleProfile.id)}
                              >
                                {vehicleProfile.name} -{" "}
                                {vehicleProfile.licensePlate}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="space-y-1 mb-2">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an expense category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="space-y-1 mb-2">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            className="mt-[100px]"
                            placeholder="466.00"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="isFuelExpense"
                    render={({ field }) => (
                      <FormItem className="space-y-1 mb-2">
                        <FormLabel>Was this for fuel?</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (value === "1") {
                              form.setValue("isMaintenanceExpense", "0");
                            }
                            if (value === "0") {
                              form.setValue("litresOfFuelPurchased", 0);
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Please select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Yes</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="litresOfFuelPurchased"
                    render={({ field }) => (
                      <FormItem className="space-y-1 mb-2">
                        <FormLabel>Litres of fuel purchased</FormLabel>
                        <FormControl>
                          <Input
                            className="mt-[100px]"
                            placeholder="20"
                            disabled={
                              isFuelExpenseWatch === "0" ||
                              isMaintenanceExpenseWatch === "1"
                            }
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="isMaintenanceExpense"
                    render={({ field }) => (
                      <FormItem className="space-y-1 mb-2">
                        <FormLabel>Was this for maintenance?</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (value === "1") {
                              form.setValue("isFuelExpense", "0");
                              form.setValue("litresOfFuelPurchased", 0);
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Please select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Yes</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem className="space-y-1 mb-3">
                        <FormLabel>Comments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional information about the maintenance performed"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expenseDate"
                    render={({ field }) => (
                      <FormItem className="space-y-1 mb-2">
                        <FormLabel className="block mb-1">
                          Expense Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  {isCreating ? (
                    <Button disabled className="mt-6">
                      <Loader2 className="animate-spin" />
                      Record New Expense
                    </Button>
                  ) : (
                    <Button type="submit" className="mt-6">
                      <CheckCircle /> Record New Expense
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
