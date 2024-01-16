import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import DataService from "#/services/DataService.js";
import ShopCard from "#/components/domain/delivery/ShopCard.jsx";
import { useLocationState } from "#/stores/LocationState.js";
import Stack from "@mui/material/Stack";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import ContinueButtonContainer
  from "#/components/domain/delivery/ContinueButtonContainer.jsx";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import serializeState from "#/utils/serializeState.js";

const PickupSelectionContainer = () => {
  const { shops } = DataService();
  const location = useLocationState();
  const tempSelection = useHookstate(null);

  useEffect(() => {
    if(location?.shop != null){
      tempSelection.set(serializeState(location?.shop));
    }
  }, []);
  const handleShopSelection = (shop) => {
    tempSelection?.set(shop)
  };

  const handleContinue = () => {
    location?.fillFromShop(serializeState(tempSelection.get()));
    location?.nextStep();
  }

  return (
    <Box className="flex-1 w-full flex flex-col gap-8 h-full">
      <Stack direction="row" spacing={2} alignItems="center" className="w-full">
        {shops &&
          shops?.length > 0 &&
          shops?.map((shop) => (
            <ShopCard
              shop={shop}
              key={shop?._id}
              isSelected={tempSelection?.value?._id === shop?._id}
              handleSelection={handleShopSelection}
            />
          ))}
      </Stack>
      <ContinueButtonContainer
          onClick={handleContinue}
          isDisabled={!tempSelection?.value}
        />
    </Box>
  );
};

export default PickupSelectionContainer;
