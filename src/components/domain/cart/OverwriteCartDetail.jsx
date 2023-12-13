import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12";
import DataService from "#/services/DataService.js";

export default function OverwriteCartDetail({ cart, isLocal = false }) {
  const { menu } = DataService();
  return (
    <Box className="flex flex-col justify-center items-start ">
      {isLocal && (
        <Box>
          <Regular12>
            {cart?.getItems()?.map((item, index) => {
              return (
                item?.name + (index < cart?.getItemsCounter() - 1 ? ", " : "")
              );
            })}
          </Regular12>
        </Box>
      )}
      {!isLocal && (
        <Box>
          <Regular12>
            {cart?.menu?.map((item, index) => {
              return (
                menu?.find((element) => element._id === item.product)?.name +
                (index < cart?.menu?.length - 1 ? ", " : "")
              );
            })}
          </Regular12>
        </Box>
      )}
    </Box>
  );
}
