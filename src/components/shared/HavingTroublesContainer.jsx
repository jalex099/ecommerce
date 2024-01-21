import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { useMemo } from "react";
import { Link } from "@mui/material";
import { SUPPORT_EMAIL } from "#/config/constants.js";
import ProblemIcon from "#/components/shared/icons/ProblemIcon.jsx";

const HavingTroublesContainer = ({situation = null}) => {

  const situationText = useMemo(()=>{
    switch (situation) {
      case "payment":
        return "¿Tienes problemas con el pago?"
      case "delivery":
        return "¿Tienes problemas con la entrega?"
      default:
        return "¿Tienes problemas?"
    }
  }, [situation])

  return (
    <Box className={"w-full p-4 rounded-md flex flex-row gap-4 items-center justify-center"}
      sx={{bgcolor: 'secondary10.main'}}
    >
      <ProblemIcon className={"w-10"}/>
     <Box className={"flex flex-1 gap-09 flex-col"}>
       <SemiBold16>
         {situationText}
       </SemiBold16>
       <Regular14>
         Contáctanos <Link href={`mailto:${SUPPORT_EMAIL}`} color={"secondary"}>aquí</Link>
       </Regular14>
     </Box>
    </Box>
  )
}

export default HavingTroublesContainer;