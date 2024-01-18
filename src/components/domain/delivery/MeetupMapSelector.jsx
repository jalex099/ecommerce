import { MAPBOX_ACCESS_TOKEN, MAPBOX_ZOOM } from "#/config/constants.js";
import spanishLocaleMapbox from "#/utils/mapbox/es.js";
import Map, { Marker, Popup } from "react-map-gl";
import locationSvg from "#/assets/images/location.svg";
import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import { Button } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import { useHookstate } from "@hookstate/core";
import MapCheckIcon from "#/components/shared/icons/MapCheckIcon.jsx";
import MapUncheckIcon from "#/components/shared/icons/MapUncheckIcon.jsx";

const MeetupMapSelector = ({initialLat, initialLng, meetups, selected, handlePopUp})=> {

  const mapRef = useRef(null);


  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: initialLng,
        latitude: initialLat,
        zoom: 12,
        bearing: 0,
        pitch: 0,
      }}
      style={style.mapContainer}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      locale={spanishLocaleMapbox}
    >
      {/* <NavigationControl showCompass={false} /> */}
      {
        meetups?.map((marker, index) => {
          return (
            <Marker longitude={marker?.longitude} latitude={marker?.latitude} anchor="bottom" key={marker?._id}
                    onClick={(e) => {
                      e.originalEvent.stopPropagation();
                      handlePopUp(marker)
                    }}
            >
              {
                selected === marker?._id ? (
                  <MapCheckIcon className={"h-[64px]"}/>
                ) : (
                  <MapUncheckIcon className={"h-[36px]"}/>
                )
              }
            </Marker>
          )
        })
      }
    </Map>
  )
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


export default MeetupMapSelector;