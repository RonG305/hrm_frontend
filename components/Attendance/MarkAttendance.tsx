import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../common/ShowToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAttendance } from "./actions";
import { Spinner } from "../ui/spinner";

export function MarkAttendance() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        latitude: '',
        longitude: ''
    });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      latitude: formData.latitude,
      longitude: formData.longitude,
    },
  });

useEffect(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toString();
        const lon = position.coords.longitude.toString();

        setValue("latitude", lat);
        setValue("longitude", lon);
      },
      (error) => {
        console.error("Geolocation error:", error.message);
      }
    );
  }
}, [setValue]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
        mutationFn: async (data: any) => {
            return markAttendance(data);
        },
        onSuccess: (data) => {
          if(data?.error) {
            showToast({
                title: "Error",
                message: data?.error || "An error occurred while marking attendance !",
                type: "error"
            });
            return;
          }
            showToast({
                title: "Success",
                message: data?.message || "Attendance marked successfully",
                type: "success"
            })
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ['attendance-records'] });
        },
        onError: (error: any) => {
            showToast({
                title: "Error",
                message: error?.message || "An error occurred while marking attendance",
                type: "error"
            });
            if (error?.message) {
                setError("root", {
                    type: "server",
                    message: error.message,
                });
            }
        },
    });
  const onSubmit = (data: any) => {
    mutate(data);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Mark attendance</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
          <DialogDescription>
            mark your attendance today.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-4 hidden">
            <div className="grid gap-3">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                {...register("latitude")}
                value={formData.latitude}
                readOnly
              />
            </div>

           <div className="grid gap-3">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                {...register("longitude")}
                value={formData.longitude}
                readOnly
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{isPending ? <Spinner /> : "Mark Attendance"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
