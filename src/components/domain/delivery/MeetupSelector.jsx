import BuildingIcon from "#/components/shared/icons/BuildingIcon.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import PointOfMapIcon  from "#/components/shared/icons/PointOfMapIcon.jsx";
import TouchRippleEffect from "#/components/shared/TouchRippleEffect.jsx";
const MeetupSelector = ({handleEvent}) => {
  const handleClick = () => {
    if (typeof handleEvent === "function") handleEvent(2);
  }
return (
  <Box className={"relative" }
    onClick={handleClick}
  >

    <TouchRippleEffect className={"flex flex-col gap-2 justify-center items-center w-full  p-4 text-center "}>
      <PointOfMapIcon className={"w-[80px]"}/>
      <SemiBold16>
        Punto de encuentro
      </SemiBold16>
      <Regular14>

        Nos veremos en un punto de encuentro a cierta hora para que recojas tu pedido
      </Regular14>
  </TouchRippleEffect>
  </Box>
)
}

export default MeetupSelector