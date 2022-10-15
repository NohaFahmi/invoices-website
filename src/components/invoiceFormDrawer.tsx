import { Drawer } from "antd";
import InvoiceForm from "./invoiceForm";
import "../utils/styles/components/invoice-form-drawer.scss";
import { IInvoice } from "../interfaces/invoice.interface";

const InvoiceFormDrawer = ({
  showDrawer,
  hideDrawer,
  invoice,
}: {
  showDrawer: boolean;
  hideDrawer: () => void;
  invoice?: IInvoice;
}) => {
  const onClose = () => {
    hideDrawer();
  };
  console.log(invoice);
  return (
    <Drawer
      title={
        invoice && invoice.invoiceID
          ? `Edit #${invoice.invoiceID}`
          : "New Invoice"
      }
      placement="left"
      closable={false}
      onClose={onClose}
      visible={showDrawer}
      className="drawer-container"
    >
      <InvoiceForm invoice={invoice} />
    </Drawer>
  );
};
export default InvoiceFormDrawer;
