import ClientAddressRepository from "#/repositories/ClientAddressRepository";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ClientAddressService = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { getAddresses, addAddress, deleteAddress } = ClientAddressRepository();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getAddresses"],
    queryFn: getAddresses,
    refetchOnWindowFocus: false,
    staleTime: "Infinity",
  });

  const add = useMutation({
    mutationFn: addAddress,
    onSuccess: ({ data, status }) => {
      console.log(data, status);
      queryClient.invalidateQueries(["getAddresses"], {});
      navigate(-1);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const remove = useMutation({
    mutationFn: deleteAddress,
    onSuccess: ({ data, status }) => {
      console.log(data, status);
      queryClient.invalidateQueries(["getAddresses"], {});
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    addresses: data?.data,
    isLoading,
    isRefetching,
    add,
    remove,
  };
};

export default ClientAddressService;
