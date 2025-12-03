import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../ui/textarea";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../common/ShowToast";
import InputErrorText from "../../common/InputErrorText";
import React, { useEffect, useState } from "react";
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
import { getLeaveTypes } from "../LeaveTypes/actions";
import { createLeaveApplication, updateLeaveApplication } from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeaveType } from "../LeaveTypes/types";
import { LeaveApplication } from "./types";
import { SquarePenIcon } from "lucide-react";

const leaveApplicationSchema = z.object({
  leave_type: z.string().min(1, "Leave type is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  reason: z.string().min(1, "Reason is required"),
});

type formFields = z.infer<typeof leaveApplicationSchema>;

export function UpdateLeaveApplication({leave_application}: {leave_application: LeaveApplication}) {
  const [open, setOpen] = React.useState(false);
  const [LeaveTypes, setLeaveTypes] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formFields>({ resolver: zodResolver(leaveApplicationSchema), defaultValues: {
    leave_type: leave_application.leave_type.id,
    start_date: leave_application.start_date,
    end_date: leave_application.end_date,
    reason: leave_application.reason,
  } });

  useEffect(() => {
    async function fetchLeaveTypes() {
      const leave_types = await getLeaveTypes();
      setLeaveTypes(leave_types.results ?? []);
    }
    fetchLeaveTypes();
  }, []);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return updateLeaveApplication(leave_application.id, data);
    },
    onSuccess: (data) => {
      if (data.error) {
        showToast({
          title: "Error",
          message:
            data?.error ||
            "An error occurred while updating the leave application",
          type: "error",
        });
        return;
      }
      showToast({
        title: "Success",
        message: data?.message || "Leave application updated successfully",
        type: "success",
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["leave_applications"] });
    },
    onError: (error: any) => {
      showToast({
        title: "Error",
        message:
          error?.message ||
          "An error occurred while updating the leave application",
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
            <DialogTitle>Update Leave Application</DialogTitle>
            <DialogDescription>
              Fill in the details below to update the leave application.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid flex-1 auto-rows-min gap-2">
              <div>
                <Controller
                  name="leave_type"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-3">
                      <Label htmlFor="leave_type">Leave Type</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={!!errors.leave_type}
                        >
                          <SelectValue placeholder="Select Leave Type" />
                        </SelectTrigger>

                        <SelectContent>
                          {LeaveTypes.map((leaveType: LeaveType) => (
                            <SelectItem key={leaveType.id} value={leaveType.id}>
                              {leaveType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.leave_type && (
                        <InputErrorText error={errors.leave_type.message} />
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  aria-invalid={!!errors.start_date}
                  {...register("start_date")}
                />
                <InputErrorText error={errors.start_date?.message} />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  aria-invalid={!!errors.end_date}
                  {...register("end_date")}
                />
                <InputErrorText error={errors.end_date?.message} />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  aria-invalid={!!errors.reason}
                  {...register("reason")}
                />
                <InputErrorText error={errors.reason?.message} />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {isPending ? <Spinner /> : "Updated Leave Application"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
