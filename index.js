import React from "react";
import ReactDOM from "react-dom/client";
import GoogleTranslate from "./GoogleTranslate"; // Import the translator component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleTranslate />
  </React.StrictMode>
  );
