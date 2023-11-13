import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12";
import SemiBold12 from "#/components/shared/fonts/SemiBold12";
import { formatCurrency } from "#/utils/currency";
import Picture from "#/components/shared/Picture";
import ImageService from "#/services/ImageService";
import TouchRippleEffect from "#/components/shared/TouchRippleEffect";

function OptionCard({ option }) {
  const { findImage } = ImageService();
  return (
    <Box className="min-w-[100px] max-w-[100px] h-[180px] ">
      <TouchRippleEffect className="flex flex-col items-start justify-start p-3 gap-2 shadow-md rounded-md relative h-full w-full">
        <Picture
          webp={findImage(option?.option?._id, "PRD", "webp")}
          jpg={findImage(option?.option?._id, "PRD", "jpg")}
          alt={option?.option?.name}
          imgStyle={{
            borderRadius: "16px",
            width: "100%",
            aspectRatio: "1/1",
          }}
        />
        <Regular12>{option?.option?.name}</Regular12>
        {/* {option?.adicionalPrice > 0 && ( */}
        <SemiBold12
          className="absolute bottom-2 right-2"
          style={{ color: "#FF4D4D" }}
        >
          {formatCurrency(option?.aditionalPrice)}
        </SemiBold12>
        {/* )} */}
      </TouchRippleEffect>
    </Box>
  );
}

export default OptionCard;
