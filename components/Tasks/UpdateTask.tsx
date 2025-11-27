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
import { Textarea } from "../ui/textarea";
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
import { createTask, updateTask } from "./actions";
import { showToast } from "../common/ShowToast";
import InputErrorText from "../common/InputErrorText";
import React, { useEffect } from "react";
import { getEmployees } from "../Employees/actions";
import { Employee } from "../Employees/types";
import { Spinner } from "../ui/spinner";
import { Task } from "./types";
import { SquarePenIcon } from "lucide-react";
import { updateData } from "@/lib/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  due_date: z.string().min(1, "Due date is required"),
  // files: z.array(z.string()).optional(),
  priority: z.enum(["Low", "Medium", "High"], {
    message: "Priority is required",
  }),
  status: z.enum(["Pending", "In Progress", "Completed"], {
    message: "Status is required",
  }),
  assigned_to: z.string().min(1, "Assigned to is required"),
});

type formFields = z.infer<typeof taskSchema>;

export function UpdateTask({ task }: { task: Task }) {
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState<Array<any>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<formFields>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      priority: task.priority,
      status: task.status,
      assigned_to: task.assigned_to_id,
    },
  });

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
      return updateTask(task.id, data);
    },
    onSuccess: (data) => {
      showToast({
        title: "Success",
        message: data?.message || "Task updated successfully",
        type: "success",
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["user-tasks"] });
    },
    onError: (error: any) => {
      console.error("Error updating task:", error);
      showToast({
        title: "Error",
        message: error?.message || "An error occurred while updating the task",
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
        <span className="flex gap-x-2">
          <SquarePenIcon size={18} className="mr-2" />
          Edit
        </span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] overflow-y-scroll">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>
              Fill in the details below to update the task.
            </DialogDescription>
          </DialogHeader>
          <div className="grid flex-1 auto-rows-min gap-2">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                aria-invalid={!!errors.title}
                {...register("title")}
              />
              <InputErrorText error={errors.title?.message} />
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

            {/* <div className="grid gap-3">
            <Label htmlFor="files">Files</Label>
            <Input
              type="file"
              aria-invalid={!!errors.files}
              {...register("files")}
              id="files"
              multiple
              accept="image/*,application/pdf"
            />
            <InputErrorText error={errors.files?.message} />
          </div> */}

            <div className="grid gap-3">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                type="date"
                id="due-date"
                aria-invalid={!!errors.due_date}
                {...register("due_date")}
              />
              <InputErrorText error={errors.due_date?.message} />
            </div>

            <div>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-3">
                    <Label htmlFor="priority">Priority</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.priority}
                      >
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.priority && (
                      <InputErrorText error={errors.priority.message} />
                    )}
                  </div>
                )}
              />
            </div>

            <div>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.status}
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.status && (
                      <InputErrorText error={errors.status.message} />
                    )}
                  </div>
                )}
              />
            </div>

            <div>
              <Controller
                name="assigned_to"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-3">
                    <Label htmlFor="assigned_to">Assign To</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.assigned_to}
                      >
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>

                      <SelectContent>
                        {employees.map((employee: Employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.first_name} {employee.last_name}
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
  );
}
