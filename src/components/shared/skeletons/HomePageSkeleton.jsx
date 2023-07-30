import { Skeleton } from "primereact/skeleton";


const HomePageSkeleton = () => {
  return (
    <div style={style.container} className="container">
      <Skeleton width="100%" height="180px" borderRadius='16px' />
    </div>
  );
};

const style = {
  container:{
    display: "flex",
    flexDirection: "column",
  }
}

export default HomePageSkeleton;