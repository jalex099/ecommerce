import DataService from "#/services/DataService.js";

const CategoriesList = () => {
  const {categories } = DataService();
  return (
    <>
      {
        categories?.map((item, index)=>{
            return (
              <div key={index} className="p-col-12 p-md-4 p-lg-3 p-xl-2">
                {item?.name}
              </div>
            )
        })
      }
    </>
  )
}

export default CategoriesList;