import DeliveryIcon from "#/components/shared/icons/DeliveryIcon.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Box from "@mui/material/Box";
import BuildingIcon from "#/components/shared/icons/BuildingIcon.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import StoreIcon from "#/components/shared/icons/StoreIcon.jsx";
import TouchRippleEffect from "#/components/shared/TouchRippleEffect.jsx";
import CheckIcon from "#/components/shared/icons/CheckIcon.jsx";

const PickupSelector = ({isSelected, handleEvent}) => {
  const handleClick = () => {
    if (typeof handleEvent === "function") handleEvent(1);
  }
return (
  <Box className={"relative" }
        sx={{
          bgcolor: isSelected ? "primary10.main" : "background.paper",
        }}
    onClick={handleClick}
  >
    <TouchRippleEffect className={"flex flex-col gap-2 justify-center items-center w-full  p-4 text-center "}>
      <StoreIcon  className={"w-[80px]"}/>
      <SemiBold16>
        Recoger en tienda
      </SemiBold16>
      <Regular14>
        Puedes recoger tu pedido en la tienda más cercana
      </Regular14>

      {
        isSelected &&
        <CheckIcon className={"absolute top-2 right-2 w-6"} />
      }
    </TouchRippleEffect>
  </Box>
)
}

export default PickupSelector