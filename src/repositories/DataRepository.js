import API from "#/repositories/API.js";

const DataRepository = () => {
  const getData = async () => {
    return await API.get("/menu", {
      await: true,
    });
  };

  return {
    getData,
  };
};

export default DataRepository;
