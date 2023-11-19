import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


import "./index.css";
import App from "./App";

import "aos/dist/aos.css";
import "remixicon/fonts/remixicon.css";
import { AuthContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
