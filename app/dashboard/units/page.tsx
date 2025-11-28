import ErrorMessagePage from '@/components/common/ErrorMessagePage';
import { getAllUnits } from '@/components/Oragnization/Units/actions';
import UnitsList from '@/components/Oragnization/Units/UnitsList';

const page = async () => {
      const units = await getAllUnits();
      if (units.error) {
        return <ErrorMessagePage errorMessage={units.error} />;
      }
  return  <UnitsList initialData={units} />
}

export default page
