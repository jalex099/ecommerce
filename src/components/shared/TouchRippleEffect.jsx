import Box from "@mui/material/Box";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import React from "react";

export default function TouchRippleEffect({ children, styles, ...props }) {
  const rippleRef = React.useRef(null);
  const onRippleStart = (e) => {
    rippleRef.current.start(e);
  };
  const onRippleStop = (e) => {
    rippleRef.current.stop(e);
  };
  return (
    <Box
      sx={{ ...styles }}
      onTouchStart={onRippleStart}
      onTouchEnd={onRippleStop}
      {...props}
    >
      {children}
      <TouchRipple
        ref={rippleRef}
        center={false}
        sx={(theme) => ({
          "& .MuiTouchRipple-child": {
            backgroundColor: `${theme.palette.opacity40.main} !important`,
          },
        })}
      />
    </Box>
  );
}
