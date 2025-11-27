import ErrorMessagePage from '@/components/common/ErrorMessagePage';
import { getDepartments } from '@/components/Departments/actions';
import DepartmentsList from '@/components/Departments/DepartmentsList';

const page = async () => {
      const departments = await getDepartments();
      if (departments.error) {
        return <ErrorMessagePage errorMessage={departments.error} />;
      }
  return  <DepartmentsList initialData={departments} />
}

export default page
