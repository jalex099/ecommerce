import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import SemiBold18 from "#/components/shared/fonts/SemiBold18";

const OnlyTitleTopBar = ({ title }) => {
  return (
    <Box className={"flex justify-center"}>
      <Fade
        in={true}
        timeout={{
          enter: 500,
          exit: 0,
        }}
      >
        <Toolbar className={"w-full lg:w-[1000px]"}>
          <div/>
          {title && <SemiBold18 className="text-center">{title}</SemiBold18>}
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default OnlyTitleTopBar;