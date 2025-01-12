import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IErrorResponse } from "@/core/interfaces/IErrorResponse";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

// interface SignupResponse {
//   data: { token: string };
// }

const SignupForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/signup", values);
      localStorage.setItem("auth_token", response.data.token);
      navigate("/overview");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        (error.response?.data as IErrorResponse).message.forEach((message) => {
          toast(message, { type: "error" });
        });
      } else if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-6 justify-center items-center min-h-svh">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Signup</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              className="mt-[100px]"
                              placeholder="Gilbert Blankson-Afful"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-1 mb-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="m@example.com"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-1 mb-2">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {isLoading ? (
                    <Button disabled className="w-full">
                      <Loader2 className="animate-spin" />
                      Create my free account
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full">
                      Create my free account
                    </Button>
                  )}
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <a href="/login" className="underline underline-offset-4">
                    Login here
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignupForm;
