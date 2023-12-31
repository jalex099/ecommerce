import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import GoBackIcon from "#/components/shared/GoBackIcon";
import StepperIndicator from "#/components/domain/checkout/StepperIndicator";
function CheckoutTopBar() {
  return (
    <Box>
      <Fade
        in={true}
        timeout={{
          enter: 500,
          exit: 0,
        }}
      >
        <Toolbar
          sx={{
            gridTemplateColumns: "32px 1fr",
          }}
        >
          <GoBackIcon />
          <StepperIndicator />
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default CheckoutTopBar;
