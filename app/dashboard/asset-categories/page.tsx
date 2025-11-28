import { getAssetCategories } from '@/components/Assets/Categories/actions';
import CategoriesList from '@/components/Assets/Categories/CategoriesList';
import ErrorMessagePage from '@/components/common/ErrorMessagePage';

const page = async() => {
    const categories = await getAssetCategories();
    if(categories.error) {
        return <ErrorMessagePage errorMessage={categories.error} />;
    }
  return  <CategoriesList initialData={categories} />
}

export default page
