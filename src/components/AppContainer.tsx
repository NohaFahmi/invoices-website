import { Layout } from "antd";
import Header from "./Header";
import "../assets/styles/components/app-container.scss";
import InvoiceFormDrawer from "./InvoiceFormDrawer";
import React, { useState } from "react";
import InvoicesListPage from "../pages/InvoicesListPage";
import InvoiceDetailsPage from "../pages/InvoiceDetailsPage";
import { Route, Routes } from "react-router-dom";
import { IInvoice } from "../interfaces/invoice.interface";

const AppContainer = () => {
  const { Sider } = Layout;
  const [open, setOpen] = useState(false);
  const [invoice, setInvoice] = useState<IInvoice | undefined>();
  const openMenu = () => {
    setOpen(!open);
  };
  return (
    <Layout>
      <Sider className="main-side">
        <Header />
      </Sider>
      <Layout className="main-layout">
        <div className="responsive-header">
          <Header />
        </div>
        {open && (
          <InvoiceFormDrawer
            showDrawer={true}
            hideDrawer={() => {
              setOpen(false);
            }}
            invoice={invoice}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <InvoicesListPage
                onCreateNewInvoice={() => {
                  setInvoice(undefined);
                  setOpen(true);
                }}
              />
            }
          />
          <Route
            path="/invoice/:id"
            element={
              <InvoiceDetailsPage
                onEditInvoice={(invoice: IInvoice) => {
                  console.log(invoice);
                  if (invoice) {
                    setInvoice(invoice);
                  }
                  openMenu();
                }}
              />
            }
          />
        </Routes>
      </Layout>
    </Layout>
  );
};
export default AppContainer;
