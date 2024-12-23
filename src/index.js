import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FlashcardProvider } from "./context/flashCardContext";
import { AuthProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <FlashcardProvider>
        <App />
      </FlashcardProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
