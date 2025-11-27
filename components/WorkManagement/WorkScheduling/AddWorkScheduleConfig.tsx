import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import z from "zod";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "../../common/ShowToast";
import InputErrorText from "../../common/InputErrorText";
import React from "react";
import { Spinner } from "../../ui/spinner";
import { createWorkSchedule } from "./actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";


const shiftSchema = z.object({
  name: z.string().min(1, "Day is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
});

type formFields = z.infer<typeof shiftSchema>;


export function AddShiftScheduleConfig() {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<formFields>({
    resolver: zodResolver(shiftSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return createWorkSchedule(data);
    },
    onSuccess: (data) => {
      showToast({
        title: "Success",
        message: data?.message || "Shift schedule created successfully",
        type: "success",
      });

      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["work-schedule-configs"] });
    },
    onError: (error: any) => {
      showToast({
        title: "Error",
        message: error?.message || "Failed to create schedule",
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
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add schedule</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add Schedule</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new schedule.
            </DialogDescription>
          </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Day</Label>
              <Input
                id="name"
                placeholder="Monday"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              <InputErrorText error={errors.name?.message} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                id="start_time"
                type="time"
                aria-invalid={!!errors.start_time}
                {...register("start_time")}
              />
              <InputErrorText error={errors.start_time?.message} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="end_time">End Time</Label>
              <Input
                id="end_time"
                type="time"
                aria-invalid={!!errors.end_time}
                {...register("end_time")}
              />
              <InputErrorText error={errors.end_time?.message} />
            </div>

          </div>

          <SheetFooter>
            <div className="grid grid-cols-2 gap-2">
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>

              <Button type="submit">
                {isPending ? <Spinner /> : "Save changes"}
              </Button>
            </div>
          </SheetFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}
