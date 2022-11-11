import {Drawer, message} from "antd";
import InvoiceForm from "./invoiceForm";
import "../utils/styles/components/invoice-form-drawer.scss";
import { IInvoice } from "../interfaces/invoice.interface";
import InvoicesService from "../services/invoices.service";
import { actionTypes } from "../actions/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saveInvoiceAsDraft = (savedInvoice: IInvoice) => {
      if (savedInvoice) {
          InvoicesService.createInvoice(savedInvoice)
              .then((result: IInvoice) => {
                  dispatch({
                      type: actionTypes.CREATE_INVOICE,
                      payload: result,
                  });
                  onClose();
                  navigate(`/invoice/${result?._id}`);
                  message.success("Your invoice saved as draft!", 2);
              })
              .catch((err:any) => {
                  console.log(err);
              });
      }
  }
  const saveInvoice = (savedInvoice: IInvoice) => {
      if (invoice && invoice._id) {
          InvoicesService.updateInvoice(invoice._id, savedInvoice)
              .then((result:IInvoice) => {
                  dispatch({
                      type: actionTypes.EDIT_INVOICE,
                      payload: result,
                  });
                  onClose();
                  message.success("Your invoice saved successfully!", 2);
                  navigate(`/`);
              })
              .catch((err:any) => {
                  console.log(err);
              });
      } else {
          InvoicesService.createInvoice(savedInvoice)
              .then((result: IInvoice) => {
                  dispatch({
                      type: actionTypes.CREATE_INVOICE,
                      payload: result,
                  });
                  onClose();
                  navigate(`/invoice/${result?._id}`);
                  message.success("Your invoice saved successfully!", 2);
              })
              .catch((err: any) => {
                  console.log(err);
              });
      }
  }
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
      open={showDrawer}
      className="drawer-container"
    >
      <InvoiceForm
        invoice={invoice}
        onCancel={onClose}
        onSavingInvoice={(savedInvoice) => {saveInvoice(savedInvoice)}}
        onSavingDraft={(savedInvoice) => {saveInvoiceAsDraft(savedInvoice);}}
      />
    </Drawer>
  );
};
export default InvoiceFormDrawer;
