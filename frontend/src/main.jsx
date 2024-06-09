import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
  <GoogleOAuthProvider clientId="342743810593-iq2calgv8illj2jgoaffrdrm0i39ggn8.apps.googleusercontent.com">;
      <App />
  </GoogleOAuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);
