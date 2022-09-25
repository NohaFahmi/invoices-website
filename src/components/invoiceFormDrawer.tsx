import { Drawer } from "antd";
import { useState } from "react";
import InvoiceForm from "./invoiceForm";
import "../utils/styles/components/invoice-form-drawer.scss";

const InvoiceFormDrawer = ({ showDrawer }: { showDrawer: boolean }) => {
  const [open, setOpen] = useState(showDrawer);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title="New Invoice"
      placement="left"
      closable={false}
      onClose={onClose}
      visible={open}
      className="drawer-container"
    >
      <InvoiceForm />
    </Drawer>
  );
};
export default InvoiceFormDrawer;
