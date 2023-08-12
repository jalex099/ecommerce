import API from "#/repositories/API.js";

const DataRepository = () => {
  const getData = async () => {
    return await API.get("/data");
  };

  return {
    getData,
  };
};

export default DataRepository;
