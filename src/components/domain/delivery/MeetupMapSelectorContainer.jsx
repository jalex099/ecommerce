import Box from "@mui/material/Box";
import MeetupMapSelector
  from "#/components/domain/delivery/MeetupMapSelector.jsx";
import { useHookstate } from "@hookstate/core";
import ConfirmDialog from "#/components/shared/ConfirmDialog.jsx";
import serializeState from "#/utils/serializeState.js";
import InfoDialog from "#/components/shared/InfoDialog.jsx";

const MeetupMapSelectorContainer = ({initialLat, initialLng, meetups, selected, handleSelect})=>{
  const popUpInfo = useHookstate({});
  const isOpenDialog = useHookstate(false);

  const handlePopUp = (data) => {
    popUpInfo?.set(data);
    isOpenDialog?.set(data !== null)
  }

  return (
    <Box className={"h-full w-full"}>
      <MeetupMapSelector
        initialLat={initialLat}
        initialLng={initialLng}
        meetups={meetups}
        popUpInfo={popUpInfo?.value}
        selected={selected}
        handlePopUp={handlePopUp}
        handleSelect={handleSelect}
      />
      {
        (selected !== null && selected === popUpInfo?.value?._id) ? (
          <InfoDialog
            isOpen={isOpenDialog?.value}
            title={`Ya has seleccionado ${popUpInfo?.value?.name} - ${popUpInfo?.value?.city}`}
            content={"Si deseas cambiar el lugar de entrega, selecciona otro punto del mapa"}
            acceptText={"Aceptar"}
            handleAccept={() => handlePopUp(null)}
          />
        ) : (
          <ConfirmDialog
            isOpen={isOpenDialog?.value}
            title={`${popUpInfo?.value?.name} - ${popUpInfo?.value?.city}`}
            content={"¿Deseas seleccionar este lugar como punto de entrega?"}
            handleCancel={() => handlePopUp(null)}
            handleOk={() => handleSelect(serializeState(popUpInfo?.value))}
          />
        )
      }

    </Box>
  )
}

export default MeetupMapSelectorContainer;