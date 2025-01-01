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
//import { Card, CardHeader, CardContent } from "@/components/ui/card";
import DashboardTitle from "@/core/shared-components/DashboardTitle";
import { ArrowLeft, CalendarIcon, CheckCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

const Index = () => {
  const form = useForm();

  return (
    <>
      <DashboardTitle>Add New Fuel Record</DashboardTitle>
      <div className="bg-white mt-6 p-6 rounded-md">
        <div className="flex">
          <Button asChild size="lg" variant="secondary">
            <Link to="/expenses">
              {" "}
              <ArrowLeft /> Back to All Fuel Records
            </Link>
          </Button>
        </div>
        <div className="mt-6">
          <Form {...form}>
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-10">
              <div>
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="space-y-1 mb-2">
                      <FormLabel>Amount</FormLabel>
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
                  name="vehicle"
                  render={({ field }) => (
                    <FormItem className="space-y-1 mb-2">
                      <FormLabel>Vehicle</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">
                            Tire change
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            Oil change
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            Coolant change
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="litres"
                  render={({ field }) => (
                    <FormItem className="space-y-1 mb-3">
                      <FormLabel>Litres</FormLabel>
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
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem className="space-y-1 mb-2">
                      <FormLabel className="block mb-1">
                        Purchase Date
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
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <Button className="mt-6">
                  <CheckCircleIcon /> Add New Record
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
