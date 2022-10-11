import React from "react";
import "./App.css";
import Header from "./components/header";
import AppContainer from "./components/appContainer";
import InvoiceFormDrawer from "./components/invoiceFormDrawer";
import { ThemeContextProvider, switchDataTheme } from "./context/ThemeContext";
import { useEffect } from "react";
import InvoicesListPage from "./pages/invoicesListPage";
import InvoiceDetailsPage from "./pages/invoiceDetailsPage";
function App() {
  useEffect(() => {
    document.title = "Invoice App";
    switchDataTheme();
  });
  return (
    <ThemeContextProvider>
      <AppContainer />
    </ThemeContextProvider>
  );
}

export default App;
