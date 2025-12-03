import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { getAssetCategories } from "./Categories/actions";
import { createAsset } from "./actions";
import { AssetCategory } from "./Categories/types";
import { getEmployees } from "../Employees/actions";

const assetSchema = z.object({
    name: z.string().min(1, "Name is required"),
    serial_number: z.string().min(1, "Code is required"),
    purchase_date: z.string().min(1, "Address is required"),
    category: z.string().min(1, "Phone is required"),
    assigned_to: z.string().optional(),
    warranty_expiry_date: z.string().optional()
});

type formFields = z.infer<typeof assetSchema>;

export function AddAsset() {
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState<Array<any>>([]);
  const [categories, setCategories] = React.useState<Array<any>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<formFields>({ resolver: zodResolver(assetSchema) });

  const queryClient = useQueryClient();
  useEffect(() => {
    async function fetchData() {
     const [employees, categories] = await Promise.all([
        getEmployees(),
        getAssetCategories()
     ])
     setEmployees(employees.results);
     setCategories(categories.results);
    }
    fetchData();
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return createAsset(data);
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
          <Button variant={"secondary"}>Add Asset</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add Asset</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new asset.
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
                <Label htmlFor="serial_number">Serial Number</Label>
                <Input
                  id="serial_number"
                  aria-invalid={!!errors.serial_number}
                  {...register("serial_number")}
                />
                <InputErrorText error={errors.serial_number?.message} />
              </div>

              <div>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-3">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={!!errors.category}
                        >
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>

                        <SelectContent>
                          {categories.map((category: AssetCategory) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <InputErrorText error={errors.category.message} />
                      )}
                    </div>
                  )}
                />
              </div>

             

               <div className="grid gap-3">
                <Label htmlFor="purchase_date">Purchase Date</Label>
                <Input
                  id="purchase_date"
                  type="date"
                  aria-invalid={!!errors.purchase_date}
                  {...register("purchase_date")}
                />
                <InputErrorText error={errors.purchase_date?.message} />
              </div>

               <div className="grid gap-3">
                <Label htmlFor="warranty_expiry_date">Warranty Expiry Date</Label>
                <Input
                  id="warranty_expiry_date"
                  type="date"
                  aria-invalid={!!errors.warranty_expiry_date}
                  {...register("warranty_expiry_date")}
                />
                <InputErrorText error={errors.warranty_expiry_date?.message} />
              </div>

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
              <Button variant={"secondary"} type="submit">
                {isPending ? <Spinner /> : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
