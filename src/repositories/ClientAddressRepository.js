import API from "#/repositories/API.js";

const ClientAddressRepository = () => {
  const getAddresses = async () => {
    return await API.get("/clients/addresses", {
      secure: true,
    });
  };

  const addAddress = async (address) => {
    return await API.post("/clients/addresses", address, {
      secure: true,
      await: true,
    });
  };

  const deleteAddress = async (addressId) => {
    return await API.delete(`/clients/addresses/${addressId}`, {
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
