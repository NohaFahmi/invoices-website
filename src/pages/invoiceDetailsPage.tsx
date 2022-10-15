import { Button, Table } from "antd";
import "../utils/styles/components/invoice-details.scss";
import type { ColumnsType } from "antd/es/table";
import { GoPrimitiveDot } from "react-icons/go";
import { IoChevronBack } from "react-icons/io5";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IInvoiceState, IInvoice } from "../interfaces/invoice.interface";
import { actionTypes } from "../actions/actions";
import InvoicesService from "../services/invoices.service";
import { invoiceStatus } from "./invoicesListPage";
interface DataType {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
const columns: ColumnsType<DataType> = [
  {
    title: "Item Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "QTY.",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => <p>£ {text}</p>,
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (text) => <p>£ {text}</p>,
  },
];
const responsiveColumns: ColumnsType<DataType> = [
  {
    title: "",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <div className="item-wrapper">
        <p className="item-name">{text}</p>
        <p className="item-info">
          {record.quantity} x £ {record.price}
        </p>
      </div>
    ),
  },
  {
    title: "",
    dataIndex: "total",
    key: "total",
    render: (text) => <p className="item-total">£ {text}</p>,
  },
];

const InvoiceDetailsPage = ({
  onEditInvoice,
}: {
  onEditInvoice: (invoice: IInvoice) => void;
}) => {
  const invoice = useSelector((state: IInvoiceState) => state.invoice);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const onChangeInvoiceStatus = (status: number) => {
    if (invoice?._id && invoice.status) {
      InvoicesService.changeInvoicePaymentStatus(invoice._id, invoice.status)
        .then((result) => {
          dispatch({
            type: actionTypes.CHANGE_INVOICE_STATUS,
            payload: result,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onDeleteInvoice = () => {
    if (invoice?._id) {
      InvoicesService.deleteInvoiceById(invoice._id)
        .then((result) => {
          dispatch({
            type: actionTypes.DELETE_INVOICE,
            payload: result,
          });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (invoice) {
      dispatch({ type: actionTypes.GET_INVOICE_BY_ID, payload: invoice });
    } else {
      if (params.id) {
        InvoicesService.getInvoiceById(params.id)
          .then((invoice) => {
            dispatch({ type: actionTypes.GET_INVOICE_BY_ID, payload: invoice });
          })
          .catch((err) => {});
      }
    }
  }, []);

  return (
    <div className="invoice-details-page">
      <Link to="/" className="back-btn">
        <IoChevronBack />
        <span>Go Back</span>
      </Link>
      {invoice && (
        <>
          <div className="invoice-details-page_header">
            <div className="invoice-details-page_header_status-wrapper">
              <span>status</span>
              <span className="invoice-details-page_header_status status-1">
                <GoPrimitiveDot />
                {invoiceStatus[invoice.status]}
              </span>
            </div>
            <div className="invoice-details-page_header_cta-btns">
              <Button
                type="primary"
                shape="round"
                className="btn-grey"
                onClick={() => {
                  console.log("HERE");
                  onEditInvoice(invoice);
                }}
              >
                Edit
              </Button>
              <Button
                type="primary"
                shape="round"
                className="btn-danger"
                onClick={onDeleteInvoice}
              >
                Delete
              </Button>
              <Button
                type="primary"
                shape="round"
                className="btn-default"
                onClick={() => {
                  onChangeInvoiceStatus(invoice.status);
                }}
              >
                Mark as paid
              </Button>
            </div>
          </div>
          <div className="invoice-details-page_invoice">
            <div className="invoice-details-page_invoice_header">
              <div className="invoice-details-page_invoice_header-name">
                <p>
                  <span>#</span>
                  {invoice.invoiceID}
                </p>
                <p>{invoice.description}</p>
              </div>
              <p className="invoice-details-page_invoice_header-address">
                {invoice.senderAddress.split("-").map((item, index) => {
                  return item + <br />;
                })}
              </p>
            </div>
            <div className="invoice-details-page_invoice-body">
              <div className="invoice-details-page_invoice-info">
                <div className="invoice-details-page_invoice_col">
                  <p>Invoice Date</p>
                  <p>{invoice.createdAt}</p>
                </div>
                <div className="invoice-details-page_invoice_col">
                  <p>Payment Due</p>
                  <p>{invoice.paymentDue}</p>
                </div>
              </div>
              <div className="invoice-details-page_invoice-billto-info">
                <div className="invoice-details-page_invoice_col">
                  <p>Bill To</p>
                  <p>{invoice.billingClient.clientName}</p>
                </div>
                <p className="invoice-details-page_invoice-billto-info-address">
                  {invoice.billingClient.clientAddress
                    .split("-")
                    .map((item, index) => {
                      return item + <br />;
                    })}
                </p>
              </div>
              <div className="invoice-details-page_invoice-reciever-info">
                <div className="invoice-details-page_invoice_col">
                  <p>Sent to</p>
                  <p>{invoice.billingClient.clientEmail}</p>
                </div>
              </div>
            </div>

            <div className="invoice-details-page_summary">
              <Table
                columns={window.innerWidth > 768 ? columns : responsiveColumns}
                dataSource={invoice.items}
                bordered={false}
                pagination={{ hideOnSinglePage: true }}
                footer={() => (
                  <div className="total-amount">
                    <p>Amount Due</p>
                    <p>£ {invoice.totalInvoicePrice}</p>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="responsive-footer">
            <div className="cta-btns">
              <Button
                type="primary"
                shape="round"
                className="btn-grey"
                onClick={() => {
                  console.log("HERE");
                  onEditInvoice(invoice);
                }}
              >
                Edit
              </Button>
              <Button
                type="primary"
                shape="round"
                className="btn-danger"
                onClick={onDeleteInvoice}
              >
                Delete
              </Button>
              <Button
                type="primary"
                shape="round"
                className="btn-default"
                onClick={() => {
                  onChangeInvoiceStatus(invoice.status);
                }}
              >
                Mark as paid
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default InvoiceDetailsPage;
