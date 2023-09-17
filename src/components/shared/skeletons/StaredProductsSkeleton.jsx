import { Skeleton } from "primereact/skeleton";

const StaredProductsSkeleton = () => {
  return (
    <div className="stared-products-skeleton">
      <Skeleton
        width="100%"
        height="180px"
        borderRadius="16px"
        className="mb-6"
      />
    </div>
  );
};

export default StaredProductsSkeleton;
