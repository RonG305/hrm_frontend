import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import { Project } from "./types";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export function ViewProject({ data }: { data?: Project }) {
  console.log("Project data:", data);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>View Project</Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[600px] w-full overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>{data?.name || "View Project Details"}</SheetTitle>
          <SheetDescription>
            Details of a project together with assignees.
          </SheetDescription>
        </SheetHeader>

        <div className="flex items-center justify-end">
            <Badge
             variant={`${data?.status  === 'Completed' ? 'success' : data?.status === 'In Progress' ? 'info' : 'warning'}`}
            >{data?.status}</Badge>
        </div>


        <div className="flex items-center justify-between mt-4 mb-2">
           <p className="text-sm text-muted-foreground">Start and End Dates</p>
              <div className="flex gap-x-4 text-xs border rounded-sm p-2">
                <div>
                  <h4 className="text-primary">Start Date</h4>
                  <Separator />
                  <p>{data?.start_date}</p>
                </div>
                <div>
                  <h4 className="text-primary">End Date</h4>
                  <Separator />
                  <p >{data?.end_date}</p>
                </div>
              </div>
        </div>

        <div>
          <h4 className="text-primary">Project Description</h4>
          <p className="text-sm">{data?.description}</p>
        </div>
        <Separator />
        <div>
          {data?.assigned_to && (
            <>
              <h4 className="text-primary">Assigned users</h4>
              {data.assigned_to.map((user) => (
                <Badge variant="outline">{user}</Badge>
              ))}
            </>
          )}
        </div>
        <Separator />
        <div>
          <h4 className="text-primary">Category</h4>
          <p className="text-sm">{data?.category?.name}</p>
          <p className="text-xs text-muted-foreground">
            {data?.category?.description}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
