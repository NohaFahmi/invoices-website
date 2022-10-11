import { Layout } from "antd";
import Header from "./header";
import "../utils/styles/components/app-container.scss";
import InvoiceFormDrawer from "./invoiceFormDrawer";
import React, { useState } from "react";
import InvoicesListPage from "../pages/invoicesListPage";
import InvoiceDetailsPage from "../pages/invoiceDetailsPage";
import ConfirmationModal from "./confirmationModal";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InvoicesListPage />,
  },
  {
    path: "/invoice/:id",
    element: <InvoiceDetailsPage />,
  },
]);
const AppContainer = () => {
  const { Sider } = Layout;
  const [open, setOpen] = useState(false);
  // const openMenu = () => {
  //   setOpen(!open);
  // };
  return (
    <Layout>
      <Sider className="main-side">
        <Header />
      </Sider>
      <Layout className="main-layout">
        <div className="responsive-header">
          <Header />
        </div>
        {/* <button onClick={openMenu}>OPEN</button> */}
        {open && (
          <InvoiceFormDrawer
            showDrawer={true}
            hideDrawer={() => {
              setOpen(false);
            }}
          />
        )}
        <RouterProvider router={router} />
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
