
import { getAssetRequests } from "@/components/Assets/Requests/actions";
import AssetRequestList from "@/components/Assets/Requests/RequestList";
import ErrorMessagePage from "@/components/common/ErrorMessagePage";

const page = async () => {
  const assetRequests = await getAssetRequests();
  if (assetRequests.error) {
    return <ErrorMessagePage errorMessage={assetRequests.error} />;
  }
  return <AssetRequestList initialData={assetRequests} />;
};

export default page;
