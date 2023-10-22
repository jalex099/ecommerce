import API from "#/repositories/API.js";

const ClientAddressRepository = () => {
  const getAddresses = async () => {
    return await API.get("/client/addresses", {
      secure: true,
    });
  };

  const addAddress = async (address) => {
    return await API.post("/client/addresses", address, {
      secure: true,
      await: true,
    });
  };

  const deleteAddress = async (addressId) => {
    return await API.delete(`/client/addresses/${addressId}`, {
      secure: true,
    });
  };

  return {
    getAddresses,
    addAddress,
    deleteAddress,
  };
};

export default ClientAddressRepository;
