import { getProfileById } from "@/components/Profile/actions";
import ProfileContent from "@/components/Profile/ProfileContent";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { getUserTasks } from "@/components/Tasks/actions";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const profile = await getProfileById(id);
  const userTasks = await getUserTasks();
  return (
    <div>
      <ProfileHeader profile={profile} />
      <ProfileContent data={userTasks?.results} />
    </div>
  );
};

export default page;
