import ErrorMessagePage from '@/components/common/ErrorMessagePage';
import { getEmployees } from '@/components/Employees/actions';
import UsersList from '@/components/Users/UsersList';

const page = async () => {
      const users = await getEmployees();
      if (users.error) {
        return <ErrorMessagePage errorMessage={users.error} />;
      }
  return  <UsersList initialData={users} />
}

export default page
