import { useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import { MAPBOX_ZOOM, MAPBOX_ACCESS_TOKEN } from "#/config/constants.js";
import locationSvg from "#/assets/images/location.svg";
import spanishLocaleMapbox from "#/utils/mapbox/es.js";

function MapContainer({
  latitude,
  longitude,
  isCentered = true,
  handleLocationChange,
}) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!isCentered) return;
    mapRef?.current?.easeTo({
      center: [longitude, latitude],
      zoom: MAPBOX_ZOOM,
    });
  }, [latitude, longitude, isCentered]);
  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude,
        latitude,
        zoom: MAPBOX_ZOOM,
      }}
      style={style.mapContainer}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onClick={handleLocationChange}
      locale={spanishLocaleMapbox}
    >
      {/* <NavigationControl showCompass={false} /> */}
      <Marker longitude={longitude} latitude={latitude} anchor="bottom">
        <img src={locationSvg} alt="location-pin" style={style.marker} />
      </Marker>
    </Map>
  );
}

const style = {
  mapContainer: {
    width: "100%",
    height: "100%",
  },
  marker: {
    height: "36px",
  },
};

export default MapContainer;
