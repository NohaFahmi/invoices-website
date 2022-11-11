import React from "react";
import "./App.css";
import Header from "./components/Header";
import AppContainer from "./components/AppContainer";
import InvoiceFormDrawer from "./components/InvoiceFormDrawer";
import { ThemeContextProvider, switchDataTheme } from "./context/ThemeContext";
import { useEffect } from "react";
import InvoicesListPage from "./pages/InvoicesListPage";
import InvoiceDetailsPage from "./pages/InvoiceDetailsPage";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  useEffect(() => {
    document.title = "Invoice App";
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
