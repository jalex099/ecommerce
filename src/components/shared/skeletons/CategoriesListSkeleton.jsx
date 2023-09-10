import { Skeleton } from "primereact/skeleton";

const CategoriesListSkeleton = () => {
  return (
    <div className="container overflow-x-auto  flex flex-row gap-6">
      {[...Array(3)].map((item, index) => {
        return (
          <Skeleton
            key={index}
            width="107px"
            height="64px"
            className="rounded-2xl"
          />
        );
      })}
    </div>
  );
};

export default CategoriesListSkeleton;
