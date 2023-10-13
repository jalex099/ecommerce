import API from "#/repositories/API.js";

const ClientPreferenceRepository = () => {
  const getPreferences = async () => {
    return await API.get("/client/preferences", {
      secure: true,
    });
  };

  return {
    getPreferences,
  };
};

export default ClientPreferenceRepository;
