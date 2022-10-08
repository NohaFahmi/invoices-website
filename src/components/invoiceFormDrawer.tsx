import { Drawer } from "antd";
import InvoiceForm from "./invoiceForm";
import "../utils/styles/components/invoice-form-drawer.scss";

const InvoiceFormDrawer = ({
  showDrawer,
  hideDrawer,
}: {
  showDrawer: boolean;
  hideDrawer: () => void;
}) => {
  const onClose = () => {
    hideDrawer();
  };

  return (
    <Drawer
      title="New Invoice"
      placement="left"
      closable={false}
      onClose={onClose}
      visible={showDrawer}
      className="drawer-container"
    >
      <InvoiceForm />
    </Drawer>
  );
};
export default InvoiceFormDrawer;
