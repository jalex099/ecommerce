import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import { useHookstate } from "@hookstate/core";
import { format, parse } from "date-fns";
import { useEffect } from "react";
import { DEFAULT_DAYS_TO_DELIVER, MIN_TIME_HOUR, MAX_TIME_HOUR } from "#/config/constants.js";
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { Button } from "@mui/material";
import { useLocationState } from "#/stores/LocationState.js";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import es from 'date-fns/locale/es';

const DateAndTimeContainer = () => {
  const location = useLocationState()
  const tempDate = useHookstate(null)
  const minDate = useHookstate(new Date());
  const minTime = useHookstate(null);
  const maxTime = useHookstate(null);

  useEffect(() => {
    // Sumarle a la fecha actual los días de entrega por defecto
    const date = new Date();
    date.setDate(date.getDate() + DEFAULT_DAYS_TO_DELIVER);
    minDate.set(date);
    minTime.set(parse(MIN_TIME_HOUR, "HH:mm", new Date()), "HH:mm");
    maxTime.set(parse(MAX_TIME_HOUR, "HH:mm", new Date()), "HH:mm");

    // Si la fecha de entrega ya está establecida, la seteamos
    if (location?.dateTime === null) return;
    // Valida que la fecha de entrega no sea menor a la fecha actual minima
    if (location?.dateTime < minDate?.value) {
      tempDate.set(minDate?.value);
      return;
    }
    tempDate.set(location?.dateTime);
  }, []);


  const handleChange = (date) => {
    tempDate.set( date );
  }

  const handleConfirm = () => {
    location?.fillDateTime(tempDate?.value)
    location?.continueFromDateTime();
  }


  return (
    <Box className={"flex flex-col gap-2 h-full "}>
      <Regular16>
        Establece la fecha y hora de entrega de tu pedido para que podamos tenerlo listo a tiempo.
      </Regular16>

      <Box className={"flex-1"}>
        <StaticDateTimePicker
          value={tempDate?.value}
          minDate={minDate?.value}
          onChange={handleChange}
          ampm
          disableHighlightToday
          minTime={minTime?.value}
          maxTime={maxTime?.value}
          sx={{
            "& .MuiDateTimePickerTabs-root": {
              display: "none"
            },
            "& .MuiTypography-overline": {
              display: "none"
            },
          }}
          slotProps={{
            actionBar: {
              style: {
                display: 'none'
              }
            }
          }}
        />
        <Regular12 className={"opacity-60"}>
          * Requerimos de un m&iacute;nimo de {DEFAULT_DAYS_TO_DELIVER} d&iacute;as para preparar tu pedido.
        </Regular12>

        <Regular12 className={"opacity-60"}>
          * Nuestro horario de atenci&oacute;n es de {format(parse(MIN_TIME_HOUR, "HH:mm", new Date()), "hh:mm a")} a {format(parse(MAX_TIME_HOUR, "HH:mm", new Date()), "hh:mm a")}.
        </Regular12>
      </Box>
      <Button
        variant={"contained"}
        color={"primary"}
        fullWidth
        onClick={handleConfirm}
      >
        Continuar
      </Button>
    </Box>
  )
}

export default DateAndTimeContainer;