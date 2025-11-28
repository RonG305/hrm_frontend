import { getAssets } from '@/components/Assets/actions';
import AssetsList from '@/components/Assets/AssetsList';
import ErrorMessagePage from '@/components/common/ErrorMessagePage';

const page = async() => {
    const assets = await getAssets();
    if(assets.error) {
        return <ErrorMessagePage errorMessage={assets.error} />;
    }
  return <AssetsList initialData={assets} />
}

export default page
