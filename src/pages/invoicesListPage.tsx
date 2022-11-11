import InvoiceCard from "../components/invoiceCard";
import "../utils/styles/components/invoices-list-page.scss";
import {Select, Button, message, Spin} from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import "../utils/styles/forms.scss";
import {useEffect, useState} from "react";
import InvoicesService from "../services/invoices.service";
import { useDispatch, useSelector } from "react-redux";
import {IInvoice, IInvoiceState} from "../interfaces/invoice.interface";
import { actionTypes } from "../actions/actions";
import EmptyResult from "../components/emptyResult";

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
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const onFilteringInvoices = (value: any[]) => {
      const status = value[0];
      setIsLoading(true);
      InvoicesService.filterInvoices(status).then((invoices: IInvoice[]) => {
          dispatch({
              type: actionTypes.FILTER_INVOICES,
              payload: invoices
          })
      }).catch((err:any) => {
          message.error("Something wrong happened!", 2);
          console.log(err);
      }).finally(() => {
          setIsLoading(false);
      })
  }
  useEffect(() => {
      setIsLoading(true);
      InvoicesService.getAllInvoices()
        .then((invoices:IInvoice[]) => {
          dispatch({ type: actionTypes.GET_INVOICES, payload: invoices });
        })
        .catch((err:any) =>  {
            message.error("Something wrong happened!", 1);
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
      })
  }, []);

  return (
    <div className="invoices-list-page_wrapper">
      <div className="invoices-list-page_header">
        <div className="invoices-list-page_header-titles">
          <h1>Invoices</h1>
          {invoicesList.length > 0 && !isLoading && (
            <p>
              <span className="full-text">
                There are {invoicesList.filter((item) => item.status == 2).length} pending invoices
              </span>
              <span className="short-text">{invoicesList.length} Invoices</span>
            </p>
          )}
        </div>
        <div className="invoices-list-page_header-filters">
          <Select
            className="filter-select"
            placeholder="Filter"
            bordered={false}
            showArrow={true}
            showSearch={false}
            onChange={(value) => {onFilteringInvoices(value);}}>
            <Option value="1">Draft</Option>
            <Option value="2">Pending</Option>
            <Option value="3">Paid</Option>
            <Option value="4">All</Option>
          </Select>
          <Button
            type="primary"
            shape="round"
            className="btn-default with-icon"
            onClick={onCreateNewInvoice}>
            <span>
              <AiOutlinePlus />
            </span>
            <span className="full-text">New Invoice</span>
            <span className="short-text">New</span>
          </Button>
        </div>
      </div>
      <div className="invoices-list-page_list-container">
          {!isLoading && invoicesList.map((invoice) => {
          return <InvoiceCard key={invoice?._id} invoice={invoice} />;
        })}
          {invoicesList.length === 0 && !isLoading && <EmptyResult />}
          {<Spin size={"large"} spinning={isLoading}/>}
      </div>
    </div>
  );
};

export default InvoicesListPage;
