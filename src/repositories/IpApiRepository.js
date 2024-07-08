import IPAPI from "#/repositories/IPAPI";

const IpApiRepository = () => {
  const getIpInfo = async () => {
    return await IPAPI.get();
  };

  return {
    getIpInfo,
  };
}

export default IpApiRepository;