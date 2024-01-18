import DataService from "#/services/DataService.js";
import { useLocationState } from "#/stores/LocationState.js";
import Box from "@mui/material/Box";
import MapMultipleMarkerContainer from "#/components/shared/MapMultipleMarkerContainer.jsx";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useMemo } from "react";
import { useHookstate } from "@hookstate/core";
import GeolocationService from "#/services/GeolocationService.js";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { Button } from "@mui/material";
import ErrorGeolocationButton
  from "#/components/domain/delivery/ErrorGeolocationButton.jsx";
import MeetupMapSelectorContainer
  from "#/components/domain/delivery/MeetupMapSelectorContainer.jsx";

const MeetupSelectionContainer = () => {
  const { meetups } = DataService();
  const location = useLocationState();
  const tempLocation = useHookstate(null);
  const { getLatLong } = GeolocationService();
  const errorGeolocation = useHookstate(false);

  useEffect(() => {
      fillLocation();
  }, []);
  const fillLocation = async () => {
    try {
      errorGeolocation.set(false);
      const coords = await getLatLong();
      tempLocation.set({
        latitude: coords?.lat,
        longitude: coords?.long,
      });
    } catch (error) {
      //   addToast("No se pudo obtener tu ubicación", "error");
      console.log(error);
      errorGeolocation.set(true);
    }
  };

  const handleRetry = () => {
    fillLocation();
  }
  const handleSelect= (data) => {
    location?.fillFromMeetup(data);
    location?.nextStep();
  }
  if(tempLocation?.value === null && errorGeolocation?.value) return (
   <ErrorGeolocationButton handleRetry={handleRetry} />
  )
  return (
    <Box className="flex-1 w-full flex flex-col gap-8 h-full"
      sx={{
        minHeight: "300px !important",
      }}>
        {tempLocation?.value != null && (
          <MeetupMapSelectorContainer
            initialLat={tempLocation?.value?.latitude}
            initialLng={tempLocation?.value?.longitude}
            meetups={meetups}
            selected={location?.meetup?._id}
            handleSelect={handleSelect}
          />
        )}
    </Box>
  );
};

export default MeetupSelectionContainer;
