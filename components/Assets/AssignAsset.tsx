import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../common/ShowToast";
import InputErrorText from "../common/InputErrorText";
import React, { useEffect } from "react";
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
import { Employee } from "@/components/Employees/types";
import { updateAsset } from "./actions";
import { Asset } from "./types";
import { CheckCircle2, SquarePenIcon, User2 } from "lucide-react";
import { getEmployees } from "../Employees/actions";

const assetSchema = z.object({
  status: z.string().min(1, "Status is required"),
  assigned_to: z.string().optional(),
});

type formFields = z.infer<typeof assetSchema>;

export function AssignAsset({ asset }: { asset: Asset }) {
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState<Array<any>>([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<formFields>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
        assigned_to: asset.assigned_to || "",
        status: "Assigned"
    },
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    async function fetchData() {
      const [employees] = await Promise.all([
        getEmployees(),
      ]);
      setEmployees(employees.results);
    }
    fetchData();
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return updateAsset(asset.id, data);
    },
    onSuccess: (data) => {
      showToast({
        title: "Success",
        message: data?.message || "Asset created successfully",
        type: "success",
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
    onError: (error: any) => {
      showToast({
        title: "Error",
        message: error?.message || "An error occurred while creating the asset",
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
           <span className="flex gap-x-2"><User2 size={18} className="mr-2" />Assign asset</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Assign Asset</DialogTitle>
            <DialogDescription>
              Fill in the details below to assign the asset.
              <CheckCircle2 className="inline-block ml-2 text-success" />
            </DialogDescription>
          </DialogHeader>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid flex-1 auto-rows-min gap-2">
                <div>
                <Controller
                  name="assigned_to"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-3">
                      <Label htmlFor="assigned_to">Assigned To</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={!!errors.assigned_to}
                        >
                          <SelectValue placeholder="Select Assigned To" />
                        </SelectTrigger>

                        <SelectContent>
                          {employees.map((employee: Employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                              {employee.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.assigned_to && (
                        <InputErrorText error={errors.assigned_to.message} />
                      )}
                    </div>
                  )}
                />
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
