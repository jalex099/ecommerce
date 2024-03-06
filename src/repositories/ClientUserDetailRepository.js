import API from "#/repositories/API.js";

const ClientUserDetailRepository = () => {
  const getUserDetail = async () => {
    return await API.get("/user-detail", {
      secure: true,
    });
  };

  const saveUserDetail = async (userDetail) => {
    return await API.post(
      "/user-detail",
      {
        userDetail,
      },
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