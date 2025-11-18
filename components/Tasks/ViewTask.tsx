import React from "react";
import { Card } from "../ui/card";
import { Task } from "./types";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";

const ViewTask = ({ taskDetails }: { taskDetails: Task }) => {
  return (
    <Card className="p-4">
      <div className=" flex items-center justify-between">
        <div>
          <h3 className=" font-semibold text-lg md:text-2xl">
            {taskDetails?.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            created on {formatDate(taskDetails?.date_created)} by{" "}
            {taskDetails?.assigned_by}
          </p>
        </div>
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

      <div className="mt-4 space-y-2">
        <p>
          <span className="font-medium text-muted-foreground">Due Date:</span>{" "}
          {new Date(taskDetails?.due_date).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium text-muted-foreground">Priority:</span>{" "}
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
        </p>
      </div>

      <Card className="p-4 border">
        <h4 className="font-semibold mb-2">Description</h4>
        <p>{taskDetails?.description}</p>
      </Card>
    </Card>
  );
};

export default ViewTask;
