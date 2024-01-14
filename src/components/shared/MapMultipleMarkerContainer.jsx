import { useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import { MAPBOX_ZOOM, MAPBOX_ACCESS_TOKEN } from "#/config/constants.js";
import locationSvg from "#/assets/images/location.svg";
import spanishLocaleMapbox from "#/utils/mapbox/es.js";

function MapMultipleMarkerContainer({
                        latitude,
                        longitude,
                        markers = [],
                        isCentered = true,
                        handleLocationChange,
                        styles = {},
                      }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!isCentered) return;
    mapRef?.current?.easeTo({
      center: [latitude, longitude],
      zoom: MAPBOX_ZOOM,
    });
  }, [latitude, longitude, isCentered]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: MAPBOX_ZOOM,
      }}
      style={{ ...style.mapContainer, ...styles }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      locale={spanishLocaleMapbox}
    >
      {/* <NavigationControl showCompass={false} /> */}
      {
        markers?.map((marker, index) => {
          return (
            <Marker longitude={marker?.longitude} latitude={marker?.latitude} anchor="bottom" key={marker?._id}>
              <img src={locationSvg} alt="location-pin" style={style?.marker} />
            </Marker>
          )
        })
      }
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

export default MapMultipleMarkerContainer;
