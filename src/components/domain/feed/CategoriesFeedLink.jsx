import DataService from "#/services/DataService.js";
import CategoriesList from "#/components/domain/menu/CategoriesList";
import { useNavigate } from "react-router-dom";
import RedirectionService from "#/services/RedirectionService";

const CategoriesFeedLink = () => {
  const { categories } = DataService();
  const { redirectTo } = RedirectionService();

  const handleChange = (e, value) => {
    redirectTo("category", value);
  };
  return (
    <CategoriesList
      items={categories}
      selected={null}
      handleChange={handleChange}
    />
  );
};

export default CategoriesFeedLink;
