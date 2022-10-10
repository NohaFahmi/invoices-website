import { Button, Table } from "antd";
import "../utils/styles/components/invoice-details.scss";
import type { ColumnsType } from "antd/es/table";
import { GoPrimitiveDot } from "react-icons/go";
import { IoChevronBack } from "react-icons/io5";
interface DataType {
  key: number;
  name: string;
  qty: number;
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
    dataIndex: "qty",
    key: "qty",
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
const data: DataType[] = [
  {
    key: 1,
    name: "Banner Design",
    qty: 1,
    price: 156.0,
    total: 156.0,
  },
  {
    key: 2,
    name: "Email Design",
    qty: 2,
    price: 200,
    total: 400,
  },
];
const InvoiceDetailsPage = () => {
  return (
    <div className="invoice-details-page">
      <a href="#" className="back-btn">
        <IoChevronBack />
        <span>Go Back</span>
      </a>
      <div className="invoice-details-page_header">
        <div className="invoice-details-page_header_status-wrapper">
          <span>status</span>
          <span className="invoice-details-page_header_status status-1">
            <GoPrimitiveDot />
            Pending
          </span>
        </div>
        <div className="invoice-details-page_header_cta-btns">
          <Button type="primary" shape="round" className="btn-grey">
            Edit
          </Button>
          <Button type="primary" shape="round" className="btn-danger">
            Delete
          </Button>
          <Button type="primary" shape="round" className="btn-default">
            Mark as paid
          </Button>
        </div>
      </div>
      <div className="invoice-details-page_invoice">
        <div className="invoice-details-page_invoice_header">
          <div className="invoice-details-page_invoice_header-name">
            <p>
              <span>#</span>XM9141
            </p>
            <p>Graphic Design</p>
          </div>
          <p className="invoice-details-page_invoice_header-address">
            19 Union Terrace <br /> London <br /> E1 3EZ <br /> United Kingdom
          </p>
        </div>
        <div className="invoice-details-page_invoice-body">
          <div className="invoice-details-page_invoice-info">
            <div className="invoice-details-page_invoice_col">
              <p>Invoice Date</p>
              <p>21 Aug 2021</p>
            </div>
            <div className="invoice-details-page_invoice_col">
              <p>Payment Due</p>
              <p>21 Aug 2021</p>
            </div>
          </div>
          <div className="invoice-details-page_invoice-billto-info">
            <div className="invoice-details-page_invoice_col">
              <p>Bill To</p>
              <p>Alex Grim</p>
            </div>
            <p className="invoice-details-page_invoice-billto-info-address">
              19 Union Terrace <br /> London <br /> E1 3EZ <br /> United Kingdom
            </p>
          </div>
          <div className="invoice-details-page_invoice-reciever-info">
            <div className="invoice-details-page_invoice_col">
              <p>Sent to</p>
              <p>alexgrim@mail.com</p>
            </div>
          </div>
        </div>

        <div className="invoice-details-page_summary">
          <Table
            columns={columns}
            dataSource={data}
            bordered={false}
            pagination={{ hideOnSinglePage: true }}
            footer={() => (
              <div className="total-amount">
                <p>Amount Due</p>
                <p>£ 556.00</p>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default InvoiceDetailsPage;
