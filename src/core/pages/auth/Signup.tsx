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
import apiClient from "@/lib/axios.ts";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { processApiCallErrors } from "@/core/helpers/helpers";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
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
      password_confirmation: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/signup", values);
      localStorage.setItem("auth_token", response.data.token);
      navigate("/overview");
    } catch (error) {
      processApiCallErrors(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-2 min-h-svh">
          <div className="bg-[url(/images/signup_page.png)] bg-cover bg-center flex justify-center items-center">

          </div>
          <div className="flex flex-col justify-center items-center ">
            <Card className="w-[65%] shadow-none border-none">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">Signup</CardTitle>
                <CardDescription>
                  Enter your details below to signup to your account
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
                                  placeholder="Zoey Ivy"
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
                      </div><div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="password_confirmation"
                                render={({ field }) => (
                                    <FormItem className="space-y-1 mb-2">
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <p className={"text-center text-sm text-neutral-400"}>
                            By creating an account, you accept Myflashdeck's {" "}
                            <span className={"font-bold"}>Terms of Service</span>
                        </p>
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
      </div>
    </>
  );
};

export default SignupForm;
