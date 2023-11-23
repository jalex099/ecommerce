import API from "#/repositories/API.js";

const ClientPreferenceRepository = () => {
  const getPreferences = async () => {
    return await API.get("/client/preferences", {
      secure: true,
    });
  };

  const addPreference = async (preference) => {
    return await API.post("/client/preferences", preference, {
      secure: true,
    });
  };

  return {
    getPreferences,
    addPreference,
  };
};

export default ClientPreferenceRepository;
