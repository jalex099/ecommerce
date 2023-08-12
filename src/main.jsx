import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "#/router.jsx";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "#/config/firebase.js";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </React.StrictMode>
);
