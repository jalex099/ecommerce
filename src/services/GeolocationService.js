const GeolocationService = () => {
  const getLatLong = () => {
    return new Promise((resolve, reject) => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                lat: position.coords.latitude,
                long: position.coords.longitude,
              });
            },
            reject,
            { timeout: 10000 }
          );
        } else {
          reject("Geolocation is not supported by your browser");
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getLatLong,
  };
};

export default GeolocationService;
