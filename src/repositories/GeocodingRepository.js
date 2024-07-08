import GEOCODINGAPI from "#/repositories/GEOCODINGAPI";

const GeocodingRepository = () => {
  const getReverseGeocoding = async ({ latitude, longitude }) => {
    return await GEOCODINGAPI.get(`/geocode/json?latlng=${latitude},${longitude}`);
  }

  return {
    getReverseGeocoding,
  }
}

export default GeocodingRepository;