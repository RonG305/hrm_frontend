import ErrorMessagePage from '@/components/common/ErrorMessagePage';
import { getLeaveApplications } from '@/components/Leave/LeaveApplications/actions';
import LeaveApplicationsList from '@/components/Leave/LeaveApplications/LeaveApplicationsList';

const page = async() => {
    const leave_applications = await getLeaveApplications();
    if(leave_applications.error) {
        return <ErrorMessagePage errorMessage={leave_applications.error} />;
    }
  return <LeaveApplicationsList initialData={leave_applications} />
}

export default page