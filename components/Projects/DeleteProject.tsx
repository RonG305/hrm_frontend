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
import { Spinner } from "../ui/spinner";
import { showToast } from "../common/ShowToast";
import { Trash2 } from "lucide-react";
import { deleteProject } from "./actions";

export function DeleteProject({ project_id }: { project_id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return deleteProject(project_id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      showToast({
        title: "Project Deleted",
        type: "success",
        message: "The project has been deleted successfully.",
      });
      setOpen(false);
    },

    onError: (error: any) => {
      showToast({
        title: "Error Deleting Project",
        type: "error",
        message:
          error?.message || "An error occurred while deleting the project.",
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
          <DialogTitle>Update Employee</DialogTitle>
          <DialogDescription>
            Fill the form below to update the employee's information.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="mb-4">
            <strong className="text-destructive">Warning!</strong> Are you sure
            you want to delete this project? This action cannot be undone.
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
              {isPending ? <Spinner /> : "Delete Project"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
