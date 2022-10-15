import { Layout } from "antd";
import Header from "./header";
import "../utils/styles/components/app-container.scss";
import InvoiceFormDrawer from "./invoiceFormDrawer";
import React, { useState } from "react";
import InvoicesListPage from "../pages/invoicesListPage";
import InvoiceDetailsPage from "../pages/invoiceDetailsPage";
import ConfirmationModal from "./confirmationModal";
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
        {/* <ConfirmationModal
          showModal={true}
          title={"Confirm Deletion"}
          message={
            "Are you sure you want to delete invoice #XM9141? This action cannot be undone."
          }
          onCancel={() => console.log("HERE")}
          onConfirm={() => console.log("DONE")}
        /> */}
      </Layout>
    </Layout>
  );
};
export default AppContainer;