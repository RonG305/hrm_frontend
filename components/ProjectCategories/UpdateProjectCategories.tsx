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
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../common/ShowToast";
import InputErrorText from "../common/InputErrorText";
import React from "react";
import { Spinner } from "../ui/spinner";
import { createProjectCategory, updateProjectCategory } from "./actions";
import { ProjectCategory } from "./types";
import { SquarePenIcon } from "lucide-react";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
});

type formFields = z.infer<typeof categorySchema>;

export function UpdateProjectCategories({
  category,
}: {
  category: ProjectCategory;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formFields>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return updateProjectCategory(category.id, data);
    },
    onSuccess: (data) => {
      showToast({
        title: "Success",
        message: data?.message || "Project category updated successfully",
        type: "success",
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["project_categories"] });
    },
    onError: (error: any) => {
      showToast({
        title: "Error",
        message:
          error?.message || "An error occurred while updating the category",
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <span className="flex gap-x-2">
          <SquarePenIcon size={18} className="mr-2" />
          Edit
        </span>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[600px] overflow-y-scroll">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>Add Category</SheetTitle>
            <SheetDescription>
              Fill in the details below to add a new category.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              <InputErrorText error={errors.name?.message} />
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
      </SheetContent>
    </Sheet>
  );
}
