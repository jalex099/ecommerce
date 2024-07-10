import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Regular24 from "#/components/shared/fonts/Regular24.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import Regular8 from "#/components/shared/fonts/Regular8.jsx";
import Bold16 from "#/components/shared/fonts/Bold16.jsx";
import SemiBold12 from "#/components/shared/fonts/SemiBold12.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";

const CardFillView = ({cardNumber, cardHolderName, cardExpiration, cardCVC, cardType}) => {
  return (
    <Box
      className={"flex-1 w-full flex flex-col gap-4 px-6 py-4 min-h-[200px] max-h-[200px] rounded-md"}
      sx={{
        background: (theme) => cardType === "Visa" ? "#1a1f71"
                          : cardType === "Mastercard" ? "linear-gradient(90deg, rgba(235,0,27,1) 0%, rgba(255,95,0,1) 48%, rgba(247,158,27,1) 100%);"
                          : theme?.palette?.neutral5?.main,
        color: cardType === "Visa" || cardType === "Mastercard" ? "white" : "black"
      }}
    >
      <SemiBold12
        className={"flex-grow"}
      >
        Cr&eacute;dito o d&eacute;bito
      </SemiBold12>

      <Box>
        <Box className={"flex flex-col gap-4 justify-center items-center flex-grow"}>
          <Regular24
            className={"text-center overflow-hidden whitespace-nowrap text-ellipsis w-full"}>
            {cardNumber}
          </Regular24>
        </Box>
        <Box
          className={"flex flex-row gap-4 justify-start my-1"}
        >
          <Box className={"flex flex-row"}>
            <Regular8
              className={"flex-grow break-words max-w-[40px]"}
            >
              V&Aacute;LIDA HASTA
            </Regular8>
            <Regular14>
              {cardExpiration}
            </Regular14>
          </Box>
          {/*<Regular14>*/}
          {/*  {cardCVC}*/}
          {/*</Regular14>*/}
        </Box>

        <Box
          className={"flex flex-row gap-4 justify-between"}
        >
          <SemiBold16
            className={"overflow-hidden whitespace-nowrap text-ellipsis"}
          >
            {cardHolderName}
          </SemiBold16>

          <Bold16>
            {
              cardType === "Visa" ? "VISA" : cardType === "Mastercard" ? "MASTERCARD" : "N/A"
            }
          </Bold16>
        </Box>
      </Box>
    </Box>
  )
}

export default CardFillView;