import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../ui/textarea";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../common/ShowToast";
import InputErrorText from "../../common/InputErrorText";
import React from "react";
import { Spinner } from "../../ui/spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { assetRequestAction } from "./actions";
import { AssetRequest } from "./types";
import { EyeIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const assetRequestSchema = z.object({
  status: z.string().min(1, "Status is required"),
  comments: z.string().min(1, "Comments are required"),
});

type formFields = z.infer<typeof assetRequestSchema>;

export function ViewAssetRequest({ request }: { request: AssetRequest }) {
  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);

  const handleFormStatus = () => {
    setFormOpen(!formOpen);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<formFields>({
    resolver: zodResolver(assetRequestSchema),
    defaultValues: request,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return assetRequestAction(request.id, data);
    },
    onSuccess: (data) => {
      showToast({
        title: "Success",
        message: data?.message || "Asset request submitted successfully",
        type: "success",
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["asset_requests"] });
    },
    onError: (error: any) => {
      showToast({
        title: "Error",
        message:
          error?.message || "An error occurred while sending the asset request",
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
          <span className="flex gap-x-2">
            <EyeIcon size={18} className="mr-2" />
            View
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>View Asset Request</DialogTitle>
            <DialogDescription>Details of the asset request.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid flex-1 auto-rows-min gap-2">
              <div className="flex items-center justify-between">
                <div className="grid gap-x-3 mb-2">
                  <Label htmlFor="asset" className="font-medium ">
                    Asset
                  </Label>
                  <p className="text-muted-foreground">{request.asset}</p>
                </div>
                <div className="grid gap-x-3 mb-2">
                  <Label className="font-medium ">Requested At</Label>
                  <p className="text-muted-foreground">
                    {formatDate(request.date_created)}
                  </p>
                  <Badge
                    variant={
                      request.status === "Approved"
                        ? "success"
                        : request.status === "Pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
              </div>
              update
              <Separator />
              <div className="grid gap-x-3 mb-2">
                <Label htmlFor="asset" className="font-medium ">
                  Request details
                </Label>
                <p className="text-muted-foreground">
                  {request.request_details}
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-2">
                <div className="grid gap-x-3 mb-2">
                  <Label htmlFor="asset" className="font-medium ">
                    Requested by
                  </Label>
                  <div className="text-muted-foreground">
                    <p>
                      {request.requested_by.first_name}{" "}
                      {request.requested_by.last_name}
                    </p>
                    <p className="text-sm">{request.requested_by.email}</p>
                  </div>
                </div>

                {request.approved_by && (
                  <div className="grid gap-x-3 mb-2">
                    <Label htmlFor="asset" className="font-medium ">
                      Approved by
                    </Label>
                    <div className="text-muted-foreground">
                      <p>
                        {request.approved_by.first_name}{" "}
                        {request.approved_by.last_name}
                      </p>
                      <p className="text-sm">{request.approved_by.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {request.comments && (
              <>
                <Separator />
                <div className="grid gap-x-3 my-2">
                  <Label htmlFor="asset" className="font-medium mb-2">
                    Admin Comments
                  </Label>
                  <p className="text-muted-foreground py-4 px-2 border border-info rounded-md bg-info/10">
                    {request.comments}
                  </p>
                </div>
              </>
            )}
            <div className="flex items-center justify-end my-2">
              <Button
                type="button"
                size={"sm"}
                variant="outline"
                onClick={handleFormStatus}
              >
                {formOpen ? "Hide action" : "Show action"}
              </Button>
            </div>

            {formOpen && (
              <div className="p-4 border rounded-md ">
                <h3 className="font-medium text-lg py-4">
                  Update Request Form
                </h3>
                <div className="mb-2">
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className="w-full"
                            aria-invalid={!!errors.status}
                          >
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.status && (
                          <InputErrorText error={errors.status.message} />
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="comments">Request Details</Label>
                  <Textarea
                    id="comments"
                    aria-invalid={!!errors.comments}
                    {...register("comments")}
                  />
                  <InputErrorText error={errors.comments?.message} />
                </div>

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">
                    {isPending ? <Spinner /> : "send request"}
                  </Button>
                </DialogFooter>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
