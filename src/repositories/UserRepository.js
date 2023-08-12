import API from "#/repositories/API.js";

const UserRepository = () => {
  const auth = async (data) => {
    return await API.post('/users/auth', data);
  };

  const authGoogle = async (data) => {
    return await API.post('/users/auth/google', data);
  }

  const getOwnInfo = async () => {
    return await API.get('/users', { secure: true });
  }

  return {
    auth,
    authGoogle,
    getOwnInfo
  };
};

export default UserRepository;
