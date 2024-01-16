import { useEffect, useRef } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_ZOOM,
} from "#/config/constants.js";
import locationSvg from "#/assets/images/location.svg";
import spanishLocaleMapbox from "#/utils/mapbox/es.js";
import { useHookstate } from "@hookstate/core";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

function MapMultipleMarkerContainer({
                        latitude,
                        longitude,
                        markers = [],
                        isCentered = true,
                        handleLocationChange,
                        styles = {},
                      }) {
  const mapRef = useRef(null);
  const popUpInfo = useHookstate(null);

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
        bearing: 0,
        pitch: 0,
      }}
      style={{ ...style.mapContainer, ...styles }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      locale={spanishLocaleMapbox}
    >
      {/* <NavigationControl showCompass={false} /> */}
      {
        markers?.map((marker, index) => {
          return (
            <Marker longitude={marker?.longitude} latitude={marker?.latitude} anchor="bottom" key={marker?._id}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                popUpInfo?.set(marker)
              }}
            >
              <img src={locationSvg} alt="location-pin" style={style?.marker} />
            </Marker>
          )
        })
      }
      {
        popUpInfo?.value && (
          <Popup
            anchor="top"
            longitude={Number(popUpInfo?.value?.longitude)}
            latitude={Number(popUpInfo?.value?.latitude)}
            onClose={() => popUpInfo?.set(null)}
          >
            <Box className={"flex flex-col gap-2 min-w-[120px] px-4 py-2"}>
              <SemiBold14>
                {popUpInfo?.value?.name} - {popUpInfo?.value?.city}
              </SemiBold14>
              <Button variant={"outlined"} color={"primary"} size={"small"}>
                Seleccionar
              </Button>
            </Box>
          </Popup>
        )
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
