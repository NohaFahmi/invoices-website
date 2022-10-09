import { Button, Drawer, Layout } from "antd";
import Header from "./header";
import "../utils/styles/components/app-container.scss";
import InvoiceFormDrawer from "./invoiceFormDrawer";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useEffect } from "react";
import InvoicesListPage from "../pages/invoicesListPage";

const AppContainer = () => {
  const { Sider, Content } = Layout;
  const [open, setOpen] = useState(false);
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
        {/* <button onClick={openMenu}>OPEN</button> */}
        {open && (
          <InvoiceFormDrawer
            showDrawer={true}
            hideDrawer={() => {
              setOpen(false);
            }}
          />
        )}
        <InvoicesListPage />
      </Layout>
    </Layout>
  );
};
export default AppContainer;
