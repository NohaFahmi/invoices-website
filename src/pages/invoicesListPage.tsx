import InvoiceCard from "../components/invoiceCard";
import "../utils/styles/components/invoices-list-page.scss";
import { Select, Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import "../utils/styles/forms.scss";
import { useEffect } from "react";
import InvoicesService from "../services/invoices.service";
import { useDispatch, useSelector } from "react-redux";
import { IInvoiceState } from "../interfaces/invoice.interface";
import { actionTypes } from "../actions/actions";

const { Option } = Select;
export const invoiceStatus: { [key: number]: string } = {
  1: "Draft",
  2: "Pending",
  3: "Paid",
};
const InvoicesListPage = ({
  onCreateNewInvoice,
}: {
  onCreateNewInvoice: () => void;
}) => {
  const invoicesList = useSelector((state: IInvoiceState) => state.invoices);
  const dispatch = useDispatch();

  useEffect(() => {
    if (invoicesList.length > 0) {
      dispatch({ type: actionTypes.GET_INVOICES, payload: invoicesList });
    } else {
      InvoicesService.getAllInvoices()
        .then((invoices) => {
          dispatch({ type: actionTypes.GET_INVOICES, payload: invoices });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="invoices-list-page_wrapper">
      <div className="invoices-list-page_header">
        <div className="invoices-list-page_header-titles">
          <h1>Invoices</h1>
          {invoicesList.length > 0 && (
            <p>
              <span className="full-text">
                There are {invoicesList.length} pending invoices
              </span>
              <span className="short-text">{invoicesList.length} Invoices</span>
            </p>
          )}
        </div>
        <div className="invoices-list-page_header-filters">
          <Select
            className="filter-select"
            placeholder="Filter"
            mode="multiple"
            bordered={false}
            showArrow={true}
            showSearch={false}
            onChange={() => {
              console.log("HERE");
            }}
          >
            <Option value="1">Draft</Option>
            <Option value="2">Pending</Option>
            <Option value="3">Paid</Option>
          </Select>
          <Button
            type="primary"
            shape="round"
            className="btn-default with-icon"
            onClick={onCreateNewInvoice}
          >
            <span>
              <AiOutlinePlus />
            </span>
            <span className="full-text">New Invoice</span>
            <span className="short-text">New</span>
          </Button>
        </div>
      </div>
      <div className="invoices-list-page_list-container">
        {invoicesList.map((invoice) => {
          return <InvoiceCard key={invoice?._id} invoice={invoice} />;
        })}
      </div>
      {/* <EmptyResult /> */}
    </div>
  );
};

export default InvoicesListPage;
