import React, { useState } from "react";
import { Card } from "../ui/card";
import { Task } from "./types";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { EyeIcon } from "lucide-react";

const ViewTask = ({ taskDetails }: { taskDetails: Task }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
          <span className="flex gap-x-2"><EyeIcon size={18} className="mr-2" />View</span>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[600px] w-full overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>{taskDetails?.title || "View task Details"}</SheetTitle>
          <SheetDescription>
            <p className="text-xs text-muted-foreground">
              created on {formatDate(taskDetails?.date_created)} by{" "}
              {taskDetails?.assigned_by}
            </p>
          </SheetDescription>
        </SheetHeader>

        <div className=" flex items-center justify-end">
          <Badge
            variant={
              taskDetails?.status === "Pending"
                ? "warning"
                : taskDetails?.status === "In Progress"
                ? "info"
                : "success"
            }
            className="mt-2"
          >
            {taskDetails?.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-4 mb-2">
          <div>
            <p>Priority:</p>
            <Badge
              variant={`${
                taskDetails?.priority === "High"
                  ? "destructive"
                  : taskDetails?.priority === "Medium"
                  ? "warning"
                  : "default"
              }`}
            >
              {taskDetails?.priority}
            </Badge>
          </div>
          <div className="flex gap-x-4 text-xs border rounded-sm p-2">
            <div>
              <h4 className="text-primary">Created At</h4>
              <Separator />
              <p>{formatDate(taskDetails?.date_created)}</p>
            </div>
            <div>
              <h4 className="text-primary">Due Date</h4>
              <Separator />
              <p>{formatDate(taskDetails?.due_date)}</p>
            </div>
          </div>
        </div>
        <h4 className="text-primary">Task Description</h4>
        <div className="border px-2 py-4 rounded-md">
          <p className="text-xs text-muted-foreground">
            {taskDetails?.description}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewTask;
