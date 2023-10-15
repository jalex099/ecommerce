import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Map, { Marker } from "react-map-gl";
import { MAPBOX_ZOOM, MAPBOX_ACCESS_TOKEN } from "#/config/constants.js";
import PinImg from "#/assets/images/pin.png";

function MapContainer() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    }
  };

  const handleClicked = ({ lngLat }) => {
    const { lng, lat } = lngLat;
    setLat(lat);
    setLng(lng);
  };

  if (!lat && !lng) return <></>;
  return (
    <Box sx={style.supercontainer}>
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: MAPBOX_ZOOM,
        }}
        style={style.container}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={handleClicked}
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <img src={PinImg} alt="pin" className="h-8" />
        </Marker>
      </Map>
      ;
    </Box>
  );
}

const style = {
  supercontainer: {
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    minHeight: "200px",
  },
};

export default MapContainer;
