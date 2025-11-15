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
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputErrorText from "../common/InputErrorText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getDepartments } from "../Depatments/actions";
import { useEffect, useState } from "react";
import { getOrganizationalRoles } from "../Oragnization/actions";
import { getRoles } from "../Roles/actions";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee, updateEmployee } from "./actions";
import { Spinner } from "../ui/spinner";
import { showToast } from "../common/ShowToast";
import {
  CheckCircle2,
  DeleteIcon,
  Edit2Icon,
  SquarePenIcon,
  Trash2,
} from "lucide-react";

export function ToggleActiveStatus({ employee }: { employee: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return updateEmployee(employee.id, { is_active: !employee.is_active });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      showToast({
        title: "Employee Updated",
        type: "success",
        message: "The employee's active status has been updated successfully.",
      });
      setOpen(false);
    },

    onError: (error: any) => {
      showToast({
        title: "Error Updating Employee",
        type: "error",
        message:
          error?.message ||
          "An error occurred while updating the employee's active status.",
      });
    },
  });

  const handleToggle = () => {
    mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span
          className={`flex ${
            employee.is_active ? "text-destructive" : "text-success"
          } gap-x-2`}
        >
          {employee.is_active ? (
            <DeleteIcon size={18} className="mr-2" />
          ) : (
            <CheckCircle2 size={18} className="mr-2" />
          )}
          {employee.is_active ? "Deactivate" : "Activate"}
        </span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Employee</DialogTitle>
          <DialogDescription>
            Fill the form below to update the employee's information.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div
            className={`border rounded-lg p-4 mb-4 ${
              employee.is_active
                ? "border-destructive bg-destructive/10"
                : "border-success bg-success/10"
            }`}
          >
            This action will{" "}
            <strong>{employee.is_active ? "deactivate" : "activate"} </strong>
            the employee{" "}
            <strong className="text-muted-foreground">
              {employee.first_name} {employee.last_name}
            </strong>
            . Are you sure you want to proceed?
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={handleToggle}
              variant={employee.is_active ? "destructive" : "success"}
              type="submit"
            >
              {isPending ? (
                <Spinner />
              ) : employee.is_active ? (
                "Deactivate Employee"
              ) : (
                "Activate Employee"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
