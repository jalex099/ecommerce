import Box from "@mui/material/Box";
import Regular20 from "#/components/shared/fonts/Regular20.jsx";
import NotAvailableIcon from "#/components/shared/icons/NotAvailableIcon.jsx";

const MessagesContainer = () => {
  return (
  <Box className={"flex-grow flex flex-col gap-4 w-full justify-center items-center px-10"}>
      <Regular20>
        &Eacute;sta funcionalidad a&uacute;n no est&aacute; disponible.
      </Regular20>
    <NotAvailableIcon className={"w-24"}/>
    </Box>
  )
}

export default MessagesContainer;