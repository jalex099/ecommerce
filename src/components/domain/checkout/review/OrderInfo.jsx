import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import SemiBold12 from "#/components/shared/fonts/SemiBold12.jsx";
import { format } from "date-fns";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";

const OrderInfo = ({info}) => {console.log(info)
  return (
    <Box className={"w-full flex flex-col gap-4"}>
      <SemiBold16>
        Informaci&oacute;n del pedido
      </SemiBold16>
      <Box className={"flex flex-row gap-2 justify-between"}>
        <Box>
          <SemiBold14>
            Nombre:
          </SemiBold14>
          <Regular14>
            {info?.completeName}
          </Regular14>
        </Box>
        <Box>
          <SemiBold14>
            Tel&eacute;fono:
          </SemiBold14>
          <Regular14>
            {info?.phone}
          </Regular14>
        </Box>
      </Box>
      <Box>
        <SemiBold14>
          Correo Electr&oacute;nico:
        </SemiBold14>
        <Regular14>
          {info?.email}
        </Regular14>
      </Box>
      <Box>
        <SemiBold14>
          M&eacute;todo de entrega
        </SemiBold14>
        <Regular14>
          { info?.delivery && "Entrega a domicilio" }
          { info?.shop && "Recoger en tienda" }
          { info?.meetup && "Punto de encuentro" }
        </Regular14>
        <Regular12>
          { info?.delivery && `${info?.delivery?.street} #${info?.delivery?.houseNumber}`}
          { info?.shop && `Sucursal ${info?.shop?.name }`}
          { info?.meetup && `${info?.meetup?.name }`}
        </Regular12>
        <Regular12>
          { info?.formatedDateTime()}
        </Regular12>
      </Box>
    </Box>
  )
}

export default OrderInfo