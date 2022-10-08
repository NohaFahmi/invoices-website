import { Button, Drawer, Layout } from "antd";
import Header from "./header";
import "../utils/styles/components/app-container.scss";
import InvoiceFormDrawer from "./invoiceFormDrawer";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useEffect } from "react";

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
      <div className="responsive-header">
        <Header />
      </div>
      <Layout className="main-layout">
        {/* <button onClick={openMenu}>OPEN</button> */}
        {open && (
          <InvoiceFormDrawer
            showDrawer={true}
            hideDrawer={() => {
              setOpen(false);
            }}
          />
        )}
      </Layout>
    </Layout>
  );
};
export default AppContainer;
