import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../ui/textarea";
import z from "zod";
import {  useForm } from "react-hook-form";
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
} from "../../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { createAssetRequest } from "./actions";

const assetRequestSchema = z.object({
  asset: z.string().min(1, "Asset is required"),
  request_details: z.string().min(1, "Request details are required"),
});

type formFields = z.infer<typeof assetRequestSchema>;

export function SendAssetRequest() {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formFields>({ resolver: zodResolver(assetRequestSchema) });


  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return createAssetRequest(data);
    },
    onSuccess: (data) => {
      if(data.error) {
        showToast({
          title: "Error",
          message:
            data?.error || "An error occurred while sending the asset request",
          type: "error",
        })
        return;
      }
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
          <Button>Send asset Request</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Send Asset Request</DialogTitle>
            <DialogDescription>
              Fill in the details below to send a new asset request.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid flex-1 auto-rows-min gap-2">
              <div className="grid gap-3">
                <Label htmlFor="asset">Asset</Label>
                <Input
                  id="asset"
                  aria-invalid={!!errors.asset}
                  {...register("asset")}
                />
                <InputErrorText error={errors.asset?.message} />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="request_details">Request Details</Label>
                <Textarea
                  id="request_details"
                  aria-invalid={!!errors.request_details}
                  {...register("request_details")}
                />
                <InputErrorText error={errors.request_details?.message} />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {isPending ? <Spinner /> : "send request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
