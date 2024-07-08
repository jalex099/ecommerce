import IpApiRepository from "#/repositories/IpApiRepository.js";

import { useQuery } from "@tanstack/react-query";

const IpInfoService = ()=>{
  const { getIpInfo: _getIpInfo } = IpApiRepository();

  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["getIpInfo"],
    queryFn: _getIpInfo,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return {
    data: data?.data,
    isLoading,
    isSuccess,
    isError,
    refetch,
  }


}

export default IpInfoService;
