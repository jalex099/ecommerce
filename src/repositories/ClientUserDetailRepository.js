import API from "#/repositories/API.js";

const ClientUserDetailRepository = () => {
  const getUserDetail = async () => {
    return await API.get("/clients/user-details", {
      secure: true,
    });
  };

  const saveUserDetail = async (userDetail) => {
    return await API.post(
      "/clients/user-details",
      userDetail,
      {
        secure: true,
      }
    );
  }

  return {
    getUserDetail,
    saveUserDetail,
  };
}

export default ClientUserDetailRepository;