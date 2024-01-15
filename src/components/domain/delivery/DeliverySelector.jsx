import Box from "@mui/material/Box";
import DeliveryIcon from "#/components/shared/icons/DeliveryIcon.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import TouchRippleEffect from "#/components/shared/TouchRippleEffect.jsx";
import CheckIcon from "#/components/shared/icons/CheckIcon.jsx";

const DeliverySelector = ({isSelected, handleEvent}) => {

  const handleClick = () => {
    if (typeof handleEvent === "function") handleEvent(0);
  }
  return (
    <Box className={"relative" }
         sx={{
           bgcolor: isSelected ? "primary10.main" : "background.paper",
         }}
      onClick={handleClick}
    >
      <TouchRippleEffect className={"flex flex-col gap-2 justify-center items-center w-full  p-4 text-center "}>
        <DeliveryIcon  className={"w-[80px]"} />
        <SemiBold16>
          Envío a domicilio
        </SemiBold16>
        <Regular14>
          Tu pedido llegará a la dirección que nos indiques
        </Regular14>
        {
          isSelected &&
          <CheckIcon className={"absolute top-2 right-2 w-6"} />
        }
      </TouchRippleEffect>
    </Box>
  )
}

export default DeliverySelector