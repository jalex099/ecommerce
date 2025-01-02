/* eslint-disable react/prop-types */
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";

function HideOnScroll({ children, window, direction = "down" }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={true} direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
}

export default HideOnScroll;
