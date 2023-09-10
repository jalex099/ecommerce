import SliderComponent from "#/components/domain/home/SliderComponent.jsx";
import CategoriesList from "#/components/domain/home/CategoriesList.jsx";
import StaredProducts from "#/components/domain/home/StaredProducts";
import SearchComponent from "#/components/domain/home/SearchComponent";
const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <SearchComponent />
      <SliderComponent />
      <CategoriesList />
      <StaredProducts />
    </div>
  );
};

export default HomePage;
