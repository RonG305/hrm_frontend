import ErrorMessagePage from '@/components/common/ErrorMessagePage';
import { getAllBranches } from '@/components/Oragnization/Branches/actions';
import BranchesList from '@/components/Oragnization/Branches/BranchesList';
import { getJobRequisitions } from '@/components/RecruitmentsAndOnboarding/JobRequisitions/actions';
import JobRequisitionsList from '@/components/RecruitmentsAndOnboarding/JobRequisitions/JobRequisitionsList';

const page = async () => {
      const job_requisitions = await getJobRequisitions();
      if (job_requisitions.error) {
        return <ErrorMessagePage errorMessage={job_requisitions.error} />;
      }
  return  <JobRequisitionsList initialData={job_requisitions?.results} />
}

export default page

