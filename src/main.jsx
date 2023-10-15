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

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
