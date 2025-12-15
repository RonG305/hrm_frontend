"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "./actions";
import { showToast } from "../common/ShowToast";
import { useRouter } from "next/navigation";
import InputErrorText from "../common/InputErrorText";
import { Spinner } from "../ui/spinner";
import { Card } from "../ui/card";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type formFields = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formFields>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => loginUser(data),
    onSuccess: (data) => {
        if(data?.error) {
            showToast({
                title: "Login Failed",
                message: data.error || "Invalid email or password.",
                type: "error",
            });
            setError("root", {
                type: "server",
                message: data.error || "Login failed",
            })
            return;
        }

        localStorage.setItem("token", data?.access_token || "");
      showToast({
        title: "Login Successful",
        message: data?.message || "You have successfully logged in.",
        type: "success",
      });
      router.push("/dashboard");
    },

    onError: (error: any) => {
        setError("root", {
        type: "server",
        message: error?.message || "Login failed",
        })
      showToast({
        title: "Login Failed",
        message: error?.message || "Invalid email or password.",
        type: "error",
      });
    },
  });

  const onSubmit = (data: formFields) => {
    mutate(data);
  };
  return (
   <div className="min-h-screen grid md:grid-cols-1 grid-cols-1 bg-[url(/cubes.jpg)] bg-cover bg-bottom bg-no-repeat">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center p-10"
      >
        <Card className="w-full max-w-md space-y-8">
          <div className="text-center ">
            <h2 className="text-3xl mb-2  text-primary font-semibold tracking-tight">
              Login to account
            </h2>
            <p className=" mb-2">
              Enter your email and password to access your HRM Portal account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Icon
                  icon={"ic:baseline-mail-outline"}
                  className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"
                />
                <Input
                  type="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  className="pl-10 py-4 rounded-full"
                />
              </div>
              <InputErrorText error={errors.email?.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Icon
                  icon={"solar:lock-keyhole-linear"}
                  className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"
                />
                <Input
                  type="password"
                    aria-invalid={!!errors.password}
                  {...register("password")}
                  id="password"
                  name="password"
                  placeholder="Enter password "
                  className="pl-10 py-4 rounded-full"
                />
              </div>
              <InputErrorText error={errors.password?.message} />
            </div>

            <Button type="submit" className="w-full py-6 rounded-full mt-4">
            {isPending ? <Spinner /> : "Login"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-2">
              Forgot your password?{" "}
              <Link href="#" className="text-primary hover:underline">
                Reset here
              </Link>
            </p>
          </form>
        </Card>
      </motion.div>

    </div>
  );
};

export default Login;
