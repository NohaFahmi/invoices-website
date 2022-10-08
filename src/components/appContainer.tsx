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
    console.log(open);
    setOpen(true);
  };
  return (
    <Layout>
      <Sider className="main-side">
        <Header />
      </Sider>
      <Layout className="main-layout">
        <button onClick={openMenu}>OPEN</button>
        <InvoiceFormDrawer showDrawer={open} />
      </Layout>
    </Layout>
  );
};
export default AppContainer;
