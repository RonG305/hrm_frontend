import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm, Watch } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputErrorText from "../common/InputErrorText";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { showToast } from "../common/ShowToast";
import { getEmployees } from "../Employees/actions";
import { getAllProjectCategories } from "../ProjectCategories/actions";
import { createProject } from "./actions";
import {
  SheetClose,
  SheetFooter,
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import SearchableCategoriesInput from "../ProjectCategories/SearchableCategoriesInput";
import SearchableEmployeesInput from "../Employees/SearchableEmployeeInput";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import AllowedAccess from "../Auth/AllowedRoles";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  category: z.string().optional().or(z.null()),
  assigned_to: z.array(z.string()).optional(),
});

type formFields = z.infer<typeof projectSchema>;

export function AddProject() {
  const [categories, setCategories] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<formFields>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    async function fetchUsersAndCategories() {
      const [users, categories] = await Promise.all([
        getEmployees(),
        getAllProjectCategories(),
      ]);
      setUsers(users?.results || []);
      setCategories(categories?.results || []);
    }
    fetchUsersAndCategories();
  }, []);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return createProject(data);
    },
    onSuccess: (data) => {
      console.log("data ", data)
      if(data?.error) {
        showToast({
        title: "Failed to create project",
        type: "error",
        message: data?.error || data?.message || "The project has been created successfully.",
      });
      }
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      showToast({
        title: "Project Created",
        type: "success",
        message: "The project has been created successfully.",
      });
      setOpen(false);
    },

    onError: (error: any) => {
      if (error?.message) {
        setError(error.message as any, {
          type: "server",
          message: error.message,
        });
      }

      showToast({
        title: "Error Creating Project",
        type: "error",
        message:
          error?.message || "An error occurred while creating the project.",
      });
    },
  });
 console.log("Form Errors:", errors);
  const onSubmit = (data: formFields) => {
    console.log("Form Data:", data);
    mutate(data);
  };

  const watchedValues = control._formValues;
  return (
        <Dialog open={open} onOpenChange={setOpen}>
        <AllowedAccess allowedRoles={["admin", "hr_manager"]}>
          <DialogTrigger asChild>
          <Button>Add Project</Button>
        </DialogTrigger>
          </AllowedAccess>
        
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new project.
            </DialogDescription>
          </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Project Name</Label>
              <Input
                aria-invalid={!!errors.name}
                id="name"
                placeholder="Project name"
                {...register("name")}
              />
              {errors.name && <InputErrorText error={errors.name.message} />}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                className="min-h-[120px]"
                aria-invalid={!!errors.description}
                placeholder="Description"
                id="description"
                {...register("description")}
              />
              {errors.description && (
                <InputErrorText error={errors.description.message} />
              )}
            </div>

            <div className="grid gap-3">
              <Input
                aria-invalid={!!errors.start_date}
                type="date"
                id="start_date"
                {...register("start_date")}
              />
              {errors.start_date && (
                <InputErrorText error={errors.start_date.message} />
              )}
            </div>

            <div className="grid gap-3">
              <Input
                aria-invalid={!!errors.end_date}
                type="date"
                id="end_date"
                {...register("end_date")}
              />
              {errors.end_date && (
                <InputErrorText error={errors.end_date.message} />
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => (
                <div className="grid gap-3">
                  <SearchableCategoriesInput 
                    value={field.value ? { value: field.value, label: field.value } : null}
                    onChange={(selectedOption) => field.onChange(selectedOption?.value || null)}
                  />
                  {fieldState.error && (
                    <InputErrorText error={fieldState.error.message} />
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid gap-3">
            <Controller
              name="assigned_to"
              control={control}
              render={({ field, fieldState }) => (
                <div className="grid gap-3">
                  <SearchableEmployeesInput 
                    isMulti={true}
                    value={field.value ? field.value.map((id: string) => {
                      const user = users.find((u: any) => u.id === id);
                      return user ? { value: user.id, label: user.email } : null;
                    }).filter((u: any) => u !== null) as { value: string; label: string }[] : []}
                    onChange={(selectedOptions) => {
                      const ids = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
                      field.onChange(ids);
                    }}
                  />
                  {fieldState.error && (
                    <InputErrorText error={fieldState.error.message} />
                  )}
                </div>
              )}
            />
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
