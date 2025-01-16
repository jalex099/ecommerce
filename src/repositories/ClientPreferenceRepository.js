import API from "#/repositories/API.js";

const ClientPreferenceRepository = () => {
  const getPreferences = async () => {
    return await API.get("/clients/preferences", {
      secure: true,
    });
  };

  const addOrRemovePreferences = async ({ action, value }) => {
    return await API.post(
      `/clients/preferences/${action}`,
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
