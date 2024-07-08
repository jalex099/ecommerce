import GeocodingRepository from "#/repositories/GeocodingRepository.js";

import { useMutation } from "@tanstack/react-query";

const GeocodingService = () => {
  const { getReverseGeocoding: _getReverseGeocoding } = GeocodingRepository();

  const getReverseGeocoding = useMutation({
    mutationFn: _getReverseGeocoding,
  });

  return {
    getReverseGeocoding,
  }
}

export default GeocodingService;