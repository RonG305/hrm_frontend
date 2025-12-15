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
  total_tasks: "text-white bg-primary",
  completed_tasks: "text-success",
  in_progress_tasks: "text-info",
};

interface TaskStatsProps {
  data: TaskStatsData;
  iconMap?: Record<string, string>;
}

const TaskStatsCard = ({ data, iconMap }: TaskStatsProps) => {
  const statsArray = Object.entries(data.tasks_statistics);

  return (
    <div className="p-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-1">
      {statsArray.map(([key, stat], index) => (
        <Card 
         key={index}
         className={`flex flex-col justify-between p-4 bg-card hover:shadow-lg transition-shadow duration-300 ${colorMap[key]}`}>
          <div className="flex items-center gap-x-2">
            <Icon
              icon={iconMap?.[key] || "solar:clipboard-check-linear"}
              className={`w-7 h-7 ${colorMap[key]}   rounded-full`}
            />
            <p>{stat.description}</p>
          </div>
           <div>
            <h3 className="text-4xl font-medium">{stat.count}</h3>
          </div>

          <div className="flex items-center gap-x-1">
            <div className="border border-success rounded-full ">
              <Icon icon="solar:arrow-up-linear" />
            </div>
            <span className={`${colorMap[key]} font-medium mb-1 text-xs`}>+8% since last week</span>
          </div>
          
        </Card>
        
      ))}
    </div>
  );
};

export default TaskStatsCard;
