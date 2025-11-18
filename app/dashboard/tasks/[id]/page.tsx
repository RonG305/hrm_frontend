import { getTaskDetails } from "@/components/Tasks/actions";
import ViewTask from "@/components/Tasks/ViewTask";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } =  await params;
  const taskDetails = await getTaskDetails(id);

  return <ViewTask taskDetails={taskDetails} />
};

export default page;
