import React from "react";
import "./App.css";
import AppContainer from "./components/AppContainer";
import { ThemeContextProvider, switchDataTheme } from "./context/ThemeContext";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  useEffect(() => {
    switchDataTheme();
  });
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <AppContainer />
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
