import ClientAddressRepository from "#/repositories/ClientAddressRepository";
import { useQuery } from "@tanstack/react-query";

const ClientAddressService = () => {
  const { getAddresses } = ClientAddressRepository();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getAddresses"],
    queryFn: getAddresses,
    refetchOnWindowFocus: false,
    staleTime: "Infinity",
  });

  return {
    addresses: data?.data,
    isLoading,
    isRefetching,
  };
};

export default ClientAddressService;
