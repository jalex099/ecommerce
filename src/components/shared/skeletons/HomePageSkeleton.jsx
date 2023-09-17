import { Skeleton } from "primereact/skeleton";
import CategoriesListSkeleton from "#/components/shared/skeletons/CategoriesListSkeleton";

const HomePageSkeleton = () => {
  return (
    <div style={style.container} className="container p-4">
      <div className="flex justify-between items-center gap-2">
        <Skeleton width="75%" height="60px" borderRadius="6px" />
        <Skeleton width="20%" height="60px" borderRadius="6px" />
      </div>
      <Skeleton width="100%" height="180px" borderRadius="16px" />
      <CategoriesListSkeleton />
    </div>
  );
};

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
};

export default HomePageSkeleton;
