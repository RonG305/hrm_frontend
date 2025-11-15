import { getProfileById } from '@/components/Profile/actions';
import ProfileContent from '@/components/Profile/ProfileContent';
import ProfileHeader from '@/components/Profile/ProfileHeader';

const page = async({params}: {params: Promise<{id: string}>} ) => {
    const { id } = await params;
    const profile = await getProfileById(id);
  return (
    <div>
      <ProfileHeader profile={profile} />
      <ProfileContent />
    </div>
  )
}

export default page
