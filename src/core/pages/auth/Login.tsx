import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { processApiCallErrors } from "@/core/helpers/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/lib/axios.ts";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/login", values);
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
          <div className="bg-[url(/images/login_page.png)] bg-cover bg-center flex justify-center items-center">

          </div>
          <div className="flex flex-col justify-center items-center ">
              <Card className="w-[65%] shadow-none border-none">
                  <CardHeader>
                      <CardTitle className="text-4xl font-bold">Welcome back!</CardTitle>
                      <CardDescription>
                          Enter your credentials to login to your account
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)}>
                              <div className="flex flex-col gap-6">
                                  <div className="grid gap-2">
                                      <FormField
                                          control={form.control}
                                          name="email"
                                          render={({ field }) => (
                                              <FormItem>
                                                  <FormLabel>Email</FormLabel>
                                                  <FormControl>
                                                      <Input
                                                          id="email"
                                                          type="email"
                                                          placeholder="m@example.com"
                                                          required
                                                          {...field}
                                                      />
                                                  </FormControl>
                                              </FormItem>
                                          )}
                                      ></FormField>
                                  </div>
                                  <div className="grid gap-2">
                                      <FormField
                                          control={form.control}
                                          name="password"
                                          render={({ field }) => (
                                              <FormItem className="space-y-1">
                                                  <FormLabel>Password</FormLabel>
                                                  <FormControl>
                                                      <Input
                                                          id="password"
                                                          type="password"
                                                          required
                                                          placeholder={'Enter your password'}
                                                          {...field}
                                                      />
                                                  </FormControl>
                                              </FormItem>
                                          )}
                                      ></FormField>
                                  </div>
                                  <p className={"text-center text-sm text-neutral-400"}>
                                      By clicking login, you accept Myflashdeck's {" "}
                                      <span className={"font-bold"}>Terms of Service</span>
                                  </p>
                                  {isLoading ? (
                                      <Button disabled className="w-full">
                                          <Loader2 className="animate-spin" />
                                          Log in
                                      </Button>
                                  ) : (
                                      <Button type="submit" className="w-full">
                                          Log in
                                      </Button>
                                  )}
                              </div>
                              <div className="mt-4 text-center text-sm">
                                  Don&apos;t have an account?{" "}
                                  <a href="/signup" className="underline underline-offset-4">
                                      Sign up
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
}
