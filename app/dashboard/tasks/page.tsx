import ErrorMessagePage from "@/components/common/ErrorMessagePage";
import { getUserTasks } from "@/components/Tasks/actions";
import UserTaksList from "@/components/Tasks/TaksList";
import TaskStatsCard from "@/components/Tasks/TaskStasCard";

const page = async () => {
  const tasks = await getUserTasks();
  if (tasks.error) {
    return <ErrorMessagePage errorMessage={tasks.error} />;
  }

  const stats_data = tasks?.tasks_statistics;

  return (
    <div>
      <TaskStatsCard
        data={{
          tasks_statistics: {
            total_tasks: {
              description: stats_data?.total_tasks?.description,
              count: stats_data?.total_tasks?.count,
            },
            completed_tasks: {
              description: stats_data?.completed_tasks?.description,
              count: stats_data?.completed_tasks?.count,
            },
            pending_tasks: {
              description: stats_data?.pending_tasks?.description,
              count: stats_data?.pending_tasks?.count,
            },
            in_progress_tasks: {
              description: stats_data?.in_progress_tasks?.description,
              count: stats_data?.in_progress_tasks?.count,
            },
          },
        }}
        iconMap={{
          total_tasks: "solar:clipboard-linear",
          completed_tasks: "solar:check-circle-linear",
          pending_tasks: "solar:clock-circle-linear",
          in_progress_tasks: "solar:refresh-linear",
        }}
      />

      <UserTaksList initialData={tasks} />
    </div>
  );
};

export default page;
