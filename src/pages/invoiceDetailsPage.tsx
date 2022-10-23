import { Button, Table } from "antd";
import "../utils/styles/components/invoice-details.scss";
import type { ColumnsType } from "antd/es/table";
import { GoPrimitiveDot } from "react-icons/go";
import { IoChevronBack } from "react-icons/io5";
import {useEffect, useState} from "react";
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
    if (invoice?._id) {
      InvoicesService.changeInvoicePaymentStatus(invoice._id, status)
        .then((result:IInvoice) => {
          dispatch({
            type: actionTypes.CHANGE_INVOICE_STATUS,
            payload: result,
          });
          dispatch({
            type: actionTypes.GET_INVOICE_BY_ID,
            payload: result,
          });
        })
        .catch((err:any) => {
          console.log(err);
        });
    }
  };

  const onDeleteInvoice = () => {
    if (invoice?._id) {
      InvoicesService.deleteInvoiceById(invoice._id)
        .then((result:{message: string}) => {
          dispatch({
            type: actionTypes.DELETE_INVOICE,
            payload: {
              id: invoice._id
            },
          });
          navigate("/");
        })
        .catch((err:any) => {
          console.log(err);
        });
    }
  };
  const renderAddress = (address: string) => {
    return address.split("-").map((item, index) => {
      return (
        <span key={`add-${Math.random()}`}>
          {item} <br />
        </span>
      );
    });
  };
  useEffect(() => {
    // if (invoice) {
    //   dispatch({ type: actionTypes.GET_INVOICE_BY_ID, payload: invoice });
    // }
    if (params.id) {
      InvoicesService.getInvoiceById(params.id)
          .then((invoice: IInvoice) => {
            dispatch({ type: actionTypes.GET_INVOICE_BY_ID, payload: invoice });
          })
          .catch((err:any) => {});
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
                  onChangeInvoiceStatus(3);
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
                {renderAddress(invoice.senderAddress)}
              </p>
            </div>
            <div className="invoice-details-page_invoice-body">
              <div className="invoice-details-page_invoice-info">
                <div className="invoice-details-page_invoice_col">
                  <p>Invoice Date</p>
                  <p>
                    {Intl.DateTimeFormat("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(invoice.invoiceDate))}
                  </p>
                </div>
                <div className="invoice-details-page_invoice_col">
                  <p>Payment Due</p>
                  {invoice.paymentDue && (
                    <p>
                      {Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(invoice.paymentDue))}
                    </p>
                  )}
                </div>
              </div>
              <div className="invoice-details-page_invoice-billto-info">
                <div className="invoice-details-page_invoice_col">
                  <p>Bill To</p>
                  <p>{invoice.billingClient.clientName}</p>
                </div>
                <p className="invoice-details-page_invoice-billto-info-address">
                  {renderAddress(invoice.billingClient.clientAddress)}
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
                rowKey={(item) => item.name}
                pagination={{ hideOnSinglePage: true }}
                footer={() => (
                  <div className="total-amount">
                    <p>Amount Due</p>
                    <p>£ {invoice.totalInvoicePrice?.toFixed(2)}</p>
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
                  onChangeInvoiceStatus(3);
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
