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

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../../ui/spinner";
import { showToast } from "../../common/ShowToast";
import { Trash2 } from "lucide-react";
import { deleteLeaveType } from "./actions";

export function DeleteLeaveType({ leaveType_id }: { leaveType_id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return deleteLeaveType(leaveType_id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave_types"] });
      showToast({
        title: "Leave Type Deleted",
        type: "success",
        message: "The leave type has been deleted successfully.",
      });
      setOpen(false);
    },

    onError: (error: any) => {
      showToast({
        title: "Error Deleting Department",
        type: "error",
        message:
          error?.message || "An error occurred while deleting the department.",
      });
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="flex text-destructive gap-x-2">
          <Trash2 size={18} className="mr-2" />
          Delete
        </span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>Delete Leave Type</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this leave type? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="mb-4">
            <strong className="text-destructive">Warning!</strong> Are you sure
            you want to delete this leave type? This action cannot be undone.
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={handleDelete}
              variant={"destructive"}
              type="submit"
            >
              {isPending ? <Spinner /> : "Delete Leave Type"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
