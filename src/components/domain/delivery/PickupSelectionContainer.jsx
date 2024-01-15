import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import DataService from "#/services/DataService.js";
import ShopCard from "#/components/domain/delivery/ShopCard.jsx";
import { useLocationState } from "#/stores/LocationState.js";
import Stack from "@mui/material/Stack";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import ContinueButtonContainer
  from "#/components/domain/delivery/ContinueButtonContainer.jsx";

const PickupSelectionContainer = () => {
  const { shops } = DataService();
  const location = useLocationState();

  const handleShopSelection = (shop) => {
    location?.fillFromShop(shop);
  };

  return (
    <Box className="flex-1 w-full flex flex-col gap-8 h-full">
      <Stack direction="row" spacing={2} alignItems="center" className="w-full">
        {shops &&
          shops?.length > 0 &&
          shops?.map((shop) => (
            <ShopCard
              shop={shop}
              key={shop?._id}
              isSelected={location?.shop?._id === shop?._id}
              handleSelection={handleShopSelection}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default PickupSelectionContainer;
