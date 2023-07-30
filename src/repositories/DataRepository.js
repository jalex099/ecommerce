import API from "#/repositories/API.js";

const DataRepository = () => {
  const getData = async () => {
    return await API.get("/getData", {
      await: true,
    });
  };

  return {
    getData,
  };
};

export default DataRepository;
