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
import {  deleteEmployee, updateEmployee } from "./actions";
import { Spinner } from "../ui/spinner";
import { showToast } from "../common/ShowToast";
import { DeleteIcon, Edit2Icon, SquarePenIcon, Trash2 } from "lucide-react";

export function DeleteEmployee({employee_id}: {employee_id: string}) {
   const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return deleteEmployee(employee_id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      showToast({
        title: "Employee Deleted",
        type: "success",
        message: "The employee has been deleted successfully.",
      });
      setOpen(false);
    },

    onError: (error: any) => {
       showToast({
        title: "Error Deleting Employee",
        type: "error",
        message: error?.message || "An error occurred while deleting the employee.",
      });
    },
  });

 const handleDelete = () => {
    mutate();
 }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       <span className="flex text-destructive gap-x-2"><Trash2 size={18} className="mr-2" />Delete</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Employee</DialogTitle>
          <DialogDescription>
            Fill the form below to update the employee's information.
          </DialogDescription>
        </DialogHeader>
<div className="mt-4">
        <div className="mb-4">
          <strong className="text-destructive">Warning!</strong> Are you sure you want to delete this employee? This action cannot be undone.
        </div>
     
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button onClick={handleDelete} variant={"destructive"} type="submit">
              {isPending ? <Spinner /> : "Delete Employee"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
