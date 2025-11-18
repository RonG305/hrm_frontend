import React from "react";
import { Card } from "../ui/card";
import { Icon } from "@iconify/react";

interface SingleStat {
  description: string;
  count: number;
}

interface TaskStatsData {
  tasks_statistics: {
    total_tasks: SingleStat;
    completed_tasks: SingleStat;
    pending_tasks: SingleStat;
    in_progress_tasks: SingleStat;
  };
}

const colorMap: Record<string, string> = {
  total_tasks: "text-primary",
  completed_tasks: "text-success",
  pending_tasks: "text-warning",
  in_progress_tasks: "text-info",
};

interface TaskStatsProps {
  data: TaskStatsData;
  iconMap?: Record<string, string>;
}

const TaskStatsCard = ({ data, iconMap }: TaskStatsProps) => {
  const statsArray = Object.entries(data.tasks_statistics);

  return (
    <Card className="p-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      {statsArray.map(([key, stat], index) => (
        <div 
        
         key={key}
      className={`
        pr-4
        border-b 
        md:border-b-0 md:border-r 
        border-border 
        ${index === statsArray.length - 1 ? "border-none" : ""}
      `}>
          <div className="flex items-center gap-x-2">
            <Icon
              icon={iconMap?.[key] || "solar:clipboard-check-linear"}
              className={`w-7 h-7 ${colorMap[key]} bg-success-light p-1 rounded-full`}
            />
            <p className="text-muted-foreground">{stat.description}</p>
          </div>

          <h3 className="text-4xl font-medium py-2">{stat.count}</h3>

          <div className="flex items-center gap-x-1 mt-1">
            <div className="border border-success rounded-full p-1">
              <Icon icon="solar:arrow-up-linear" />
            </div>
            <span className={`${colorMap[key]} font-medium mb-1`}>+8% since last week</span>
          </div>
          
        </div>
        
      ))}
    </Card>
  );
};

export default TaskStatsCard;
