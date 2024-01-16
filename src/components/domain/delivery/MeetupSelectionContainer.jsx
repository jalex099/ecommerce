import DataService from "#/services/DataService.js";
import { useLocationState } from "#/stores/LocationState.js";
import Box from "@mui/material/Box";
import MapMultipleMarkerContainer from "#/components/shared/MapMultipleMarkerContainer.jsx";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useMemo } from "react";
import { useHookstate } from "@hookstate/core";
import GeolocationService from "#/services/GeolocationService.js";

const MeetupSelectionContainer = () => {
  const { meetups } = DataService();
  const location = useLocationState();
  const tempLocation = useHookstate(null);
  const { getLatLong } = GeolocationService();

  useEffect(() => {
    if (location?.meetup === null) {
          fillLocation();
    }

  }, []);
  const fillLocation = async () => {
    try {
      const coords = await getLatLong();
      tempLocation.set({
        latitude: coords?.lat,
        longitude: coords?.long,
      });
    } catch (error) {
      //   addToast("No se pudo obtener tu ubicación", "error");
      console.log(error);
    }
  };
  const handleMeetupSelection = (meetup) => {
    location?.fillFromMeetup(meetup);
  };

  const showMap = useMemo(() => {
    return !!tempLocation?.value?.latitude && !!tempLocation?.value?.longitude;
  }, [tempLocation?.value]);
  const handleLocationChange= (data) => {
      console.log(data)
  }
  return (
    <Box className="flex-1 w-full flex flex-col gap-8 h-full"
      sx={{
        minHeight: "300px !important",
      }}>
        {showMap && (
          <MapMultipleMarkerContainer
            latitude={tempLocation?.value?.latitude}
            longitude={tempLocation?.value?.longitude}
            markers={meetups}
            handleLocationChange={handleLocationChange}
          />
        )}
        {!showMap && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ borderRadius: "8px" }}
          />
        )}
    </Box>
  );
};

export default MeetupSelectionContainer;
