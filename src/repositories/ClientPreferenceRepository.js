import API from "#/repositories/API.js";

const ClientPreferenceRepository = () => {
  const getPreferences = async () => {
    return await API.get("/client/preferences", {
      secure: true,
    });
  };

  const addOrRemovePreferences = async ({ action, value }) => {
    return await API.post(
      `/client/preferences/${action}`,
      { value },
      {
        secure: true,
      }
    );
  };

  return {
    getPreferences,
    addOrRemovePreferences,
  };
};

export default ClientPreferenceRepository;
