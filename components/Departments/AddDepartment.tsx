import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import z from "zod";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../common/ShowToast";
import InputErrorText from "../common/InputErrorText";
import React from "react";
import { Spinner } from "../ui/spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { createDepartment } from "./actions";

const departmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  description: z.string().min(1, "Description is required"),
});

type formFields = z.infer<typeof departmentSchema>;

export function AddDepartment() {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formFields>({ resolver: zodResolver(departmentSchema) });

  const queryClient = useQueryClient();

  console.log("Errors:", errors);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return createDepartment(data);
    },
    onSuccess: (data) => {
      showToast({
        title: "Success",
        message: data?.message || "Department created successfully",
        type: "success",
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error: any) => {
      showToast({
        title: "Error",
        message: error?.message || "An error occurred while creating the department",
        type: "error",
      });
      if (error?.message) {
        setError("root", {
          type: "server",
          message: error.message,
        });
      }
    },
  });

  const onSubmit = (data: formFields) => {
    mutate(data);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Department</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new department.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid flex-1 auto-rows-min gap-2">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                <InputErrorText error={errors.name?.message} />
              </div>

               <div className="grid gap-3">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  aria-invalid={!!errors.code}
                  {...register("code")}
                />
                <InputErrorText error={errors.code?.message} />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  aria-invalid={!!errors.description}
                  {...register("description")}
                  className="min-h-[120px]"
                />
                <InputErrorText error={errors.description?.message} />
              </div>

             
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {isPending ? <Spinner /> : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
