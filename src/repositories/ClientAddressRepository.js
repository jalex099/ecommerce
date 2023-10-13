import API from "#/repositories/API.js";

const ClientAddressRepository = () => {
  const getAddresses = async () => {
    return await API.get("/client/addresses", {
      secure: true,
    });
  };

  return {
    getAddresses,
  };
};

export default ClientAddressRepository;
