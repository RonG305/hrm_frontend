import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../ui/textarea";
import z from "zod";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../common/ShowToast";
import InputErrorText from "../../common/InputErrorText";
import React from "react";
import { Spinner } from "../../ui/spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { createLeaveType, updateLeaveType } from "./actions";
import { LeaveType } from "./types";
import { SquarePenIcon } from "lucide-react";

const leaveTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

type formFields = z.infer<typeof leaveTypeSchema>;

export function UpdateLeaveType({leaveType}: {leaveType?: LeaveType}) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formFields>({ resolver: zodResolver(leaveTypeSchema), defaultValues: leaveType });


  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      if (!leaveType) {
        throw new Error("Leave type is required");
      }
      return updateLeaveType(leaveType.id, data);
    },
    onSuccess: (data) => {
      if(data.error) {
        showToast({
          title: "Error",
          message:
            data?.error || "An error occurred while creating the leave type",
          type: "error",
        })
        return;
      }
      showToast({
        title: "Success",
        message: data?.message || "Leave type created successfully",
        type: "success",
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["leave_types"] });
    },
    onError: (error: any) => {
      showToast({
        title: "Error",
        message:
          error?.message || "An error occurred while creating the leave type",
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
         <span className="flex gap-x-2"><SquarePenIcon size={18} className="mr-2" />Edit</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Update Leave Type</DialogTitle>
            <DialogDescription>
              Fill in the details below to update the leave type.
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  aria-invalid={!!errors.description}
                  {...register("description")}
                />
                <InputErrorText error={errors.description?.message} />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {isPending ? <Spinner /> : "Add Leave Type"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
