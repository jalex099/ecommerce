import API from "#/repositories/API.js";

const ClientPreferenceRepository = () => {
  // const getPreferences = async () => {
  //   return await API.get("/client/preferences", {
  //     secure: true,
  //   });
  // };

  const getPreferencesByOpt = async () => {
    return await API.get("/client/preferences/opt", {
      secure: true,
    });
  };

  const addPreference = async (preference) => {
    return await API.post("/client/preferences", preference, {
      secure: true,
    });
  };

  const removePreference = async (preference) => {
    return await API.delete(
      `/client/preferences/${preference?.id}/${preference?.value}`,
      {
        secure: true,
      }
    );
  };

  return {
    // getPreferences,
    getPreferencesByOpt,
    addPreference,
    removePreference,
  };
};

export default ClientPreferenceRepository;
