import ErrorMessagePage from '@/components/common/ErrorMessagePage';
import { getAllBranches } from '@/components/Oragnization/Branches/actions';
import BranchesList from '@/components/Oragnization/Branches/BranchesList';

const page = async () => {
      const branches = await getAllBranches();
      if (branches.error) {
        return <ErrorMessagePage errorMessage={branches.error} />;
      }
  return  <BranchesList initialData={branches} />
}

export default page
