import UserRepository from "#/repositories/UserRepository.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setKey } from "#/utils/localStorageHelper.js";

const UserService = () => {
  const { authGoogle, getOwnInfo: _getOwnInfo } = UserRepository();

  const { data: ownInfo } = useQuery({
    queryKey: ["auth_secure-getOwnInfo"],
    queryFn: _getOwnInfo,
    refetchOnWindowFocus: false,
  });

  const loginGoogle = useMutation({
    mutationFn: authGoogle,
    onSuccess: (data) => {
      setKey("token", data?.id_token);
      setKey("refreshToken", data?.access_token);
    },
  });

  return {
    loginGoogle,
    ownInfo,
  };
};

export default UserService;
