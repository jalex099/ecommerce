import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { createStyles, withStyles } from "@mui/styles";
import { DELIVERY_METHODS } from "#/config/constants";
import Box from "@mui/material/Box";
import SemiBold12 from "#/components/shared/fonts/SemiBold12";

export default function DeliveryMethodSelection({ selected, handleSelection }) {
  const handleClick = (event, newValue) => {
    if (typeof handleSelection === "function") handleSelection(newValue);
  };
  return (
    <Box className="flex justify-center w-full">
      <ToggleButtonGroup
        color="primary"
        size="small"
        value={selected}
        exclusive
        onChange={handleClick}
        aria-label="delivery method"
        className=""
      >
        {DELIVERY_METHODS?.map(({ value, label }) => (
          <BorderLessToggleButton value={value} aria-label={label} key={value}>
            <SemiBold12>{label}</SemiBold12>
          </BorderLessToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

const BorderLessToggleButton = withStyles((theme) =>
  createStyles({
    root: {
      border: "none",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),

      "&:not(:first-of-type)": {
        borderLeft: "none",
        marginLeft: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
      },
      "&:not(:last-of-type)": {
        borderRadius: theme.shape.borderRadius,
      },
    },
  })
)(ToggleButton);
