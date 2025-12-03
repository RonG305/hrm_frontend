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
  DialogTrigger,
} from "../../ui/dialog";
import { EyeIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { LeaveApplication } from "./types";
import { updateLeaveApplicationStatus } from "./actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const leaveApplicationStatusSchema = z.object({
  status: z.string().min(1, "Status is required"),
});

type formFields = z.infer<typeof leaveApplicationStatusSchema>;

export function UpdateLeaveApplicationStatus({ leave_application }: { leave_application: LeaveApplication }) {
  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);

  const handleFormStatus = () => {
    setFormOpen(!formOpen);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<formFields>({
    resolver: zodResolver(leaveApplicationStatusSchema)
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return updateLeaveApplicationStatus(leave_application.id, data);
    },
    onSuccess: (data) => {
      showToast({
        title: "Success",
        message: data?.message || "Leave application status updated successfully",
        type: "success",
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["leave_applications"] });
    },
    onError: (error: any) => {
      showToast({
        title: "Error",
        message:
          error?.message || "An error occurred while updating the leave application status",
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
          <span className="flex gap-x-2">
            <EyeIcon size={18} className="mr-2" />
            View
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>View Leave Application</DialogTitle>
            <DialogDescription>Details of the leave application.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid flex-1 auto-rows-min gap-2">
              <div className="flex items-center justify-between">
                <div className="grid gap-x-3 mb-2">
                  <Label htmlFor="asset" className="font-medium ">
                    Leave Type
                  </Label>
                  <p className="text-muted-foreground">{leave_application.leave_type.name}</p>
                </div>
                <div className="grid gap-x-3 mb-2">
                  <Label className="font-medium ">Requested At</Label>
                  <p className="text-muted-foreground">
                    {formatDate(leave_application.date_created)}
                  </p>
                  <Badge
                    variant={
                      leave_application.status === "approved"
                        ? "success"
                        : leave_application.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {leave_application.status}
                  </Badge>
                </div>
              </div>
              update
              <Separator />
              <div className="grid gap-x-3 mb-2">
                <Label htmlFor="asset" className="font-medium ">
                  Request details
                </Label>
                <p className="text-muted-foreground">
                  {leave_application.reason}
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-2">
                <div className="grid gap-x-3 mb-2">
                  <Label htmlFor="asset" className="font-medium ">
                    Requested by
                  </Label>
                  <div className="text-muted-foreground">
                    <p>
                      {leave_application.user}{" "}
                    </p>
                  </div>
                </div>

                {leave_application.approved_by && (
                  <div className="grid gap-x-3 mb-2">
                    <Label htmlFor="asset" className="font-medium ">
                      Approved by
                    </Label>
                    <div className="text-muted-foreground">
                      <p>
                        {leave_application.approved_by}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          
            <div className="flex items-center justify-end my-2">
              <Button
                type="button"
                size={"sm"}
                variant="outline"
                onClick={handleFormStatus}
              >
                {formOpen ? "Hide action" : "Show action"}
              </Button>
            </div>

      
              <div className="p-4 border rounded-md ">
                <div>
                    <h3 className="font-medium text-lg">
                  Update Leave Application Status
                </h3>
                <p className="text-muted-foreground text-sm">
                    If approved the employee will be notified to take a leave on the specified date, if rejected the employee will also be notified.
                </p>
                </div>
                <div className="my-2">
                    <Label htmlFor="status" className="font-medium mb-2">Status</Label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.status && (
                      <InputErrorText error={errors.status.message} />
                    )}
                </div>

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  {/* if selected value === approved variant is success else variant is destructive */}
                  <Button variant={`${watch("status") === "approved" ? "success" : watch("status") === "rejected" ? "destructive" : "default"}`} type="submit">
                    {isPending ? <Spinner /> :  watch("status") === "approved" ? "Approve" : watch("status") === "rejected" ? "Reject" : "Submit"}
                  </Button>
                </DialogFooter>
              </div>
      
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
