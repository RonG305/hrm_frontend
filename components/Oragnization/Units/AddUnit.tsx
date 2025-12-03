import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../common/ShowToast";
import InputErrorText from "../../common/InputErrorText";
import React, { useEffect } from "react";
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
import { createUnit } from "./actions";
import { Employee } from "@/components/Employees/types";
import { getEmployees } from "@/components/Employees/actions";

const UnitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  supervisor: z.string().min(1, "Supervisor is required").optional(),
});

type formFields = z.infer<typeof UnitSchema>;

export function AddUnit() {
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState<Array<any>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<formFields>({ resolver: zodResolver(UnitSchema) });


  const queryClient = useQueryClient();

   useEffect(() => {
      async function fetchEmployees() {
        const employees = await getEmployees();
        setEmployees(employees.results);
      }
      fetchEmployees();
    }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return createUnit(data);
    },
    onSuccess: (data) => {
      showToast({
        title: "Success",
        message: data?.message || "Unit created successfully",
        type: "success",
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
    onError: (error: any) => {
      showToast({
        title: "Error",
        message:
          error?.message || "An error occurred while creating the unit",
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
          <Button>Add Unit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add Unit</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new unit.
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

             
              <div>
                <Controller
                  name="supervisor"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-3">
                      <Label htmlFor="supervisor">Supervisor</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={!!errors.supervisor}
                        >
                          <SelectValue placeholder="Select Supervisor" />
                        </SelectTrigger>

                        <SelectContent>
                          {employees.map((employee: Employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                              {employee.first_name} {employee.last_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.supervisor && (
                        <InputErrorText error={errors.supervisor.message} />
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
