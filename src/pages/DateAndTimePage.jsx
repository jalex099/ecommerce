import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import { useUIState } from "#/stores/UIState.js";
import { useEffect } from "react";
import DateAndTimeContainer from "#/components/domain/dateAndTime/DateAndTimeContainer.jsx";

const DateAndTimePage = () => {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Fecha y hora");
  }, []);
    return (
      <Container sx={style?.container}>
        <HelmetMeta page="dateAndTime" />
        <DateAndTimeContainer />
      </Container>
    )
}

const style= {
  container: {
    height: '100%',
  }
}

export default DateAndTimePage;