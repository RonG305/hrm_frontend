import ErrorMessagePage from '@/components/common/ErrorMessagePage';
import { getLeaveTypes } from '@/components/Leave/LeaveTypes/actions';
import LeaveTypesList from '@/components/Leave/LeaveTypes/LeaveTypesList';

const page = async() => {
    const leave_types = await getLeaveTypes();
    console.log("Leave Types in Page:", leave_types);
    if(leave_types.error) {
        return <ErrorMessagePage errorMessage={leave_types.error} />;
    }
  return <LeaveTypesList initialData={leave_types} />
}

export default page