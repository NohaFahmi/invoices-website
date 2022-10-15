import React from "react";
import "./App.css";
import Header from "./components/header";
import AppContainer from "./components/appContainer";
import InvoiceFormDrawer from "./components/invoiceFormDrawer";
import { ThemeContextProvider, switchDataTheme } from "./context/ThemeContext";
import { useEffect } from "react";
import InvoicesListPage from "./pages/invoicesListPage";
import InvoiceDetailsPage from "./pages/invoiceDetailsPage";
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
