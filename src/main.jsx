import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "#/router.jsx";
import "#/config/firebase.js";
import { ThemeProvider } from "@mui/material/styles";
import theme from "#/theme/index.js";
import CssBaseline from "@mui/material/CssBaseline";
import { HelmetProvider } from "react-helmet-async";
import "mapbox-gl/dist/mapbox-gl.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { esES } from '@mui/x-date-pickers/locales';
import es from 'date-fns/locale/es';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
        <HelmetProvider>
          <Router />
        </HelmetProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
