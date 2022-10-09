import InvoiceCard from "../components/invoiceCard";
import "../utils/styles/components/invoices-list-page.scss";
import { Select, Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import "../utils/styles/forms.scss";

const { Option } = Select;
const InvoicesListPage = () => {
  return (
    <div className="invoices-list-page_wrapper">
      <div className="invoices-list-page_header">
        <div className="invoices-list-page_header-titles">
          <h1>Invoices</h1>
          <p>There are 4 pending invoices</p>
        </div>
        <div className="invoices-list-page_header-filters">
          <Select
            className="filter-select"
            placeholder="Filter by status"
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
          >
            <span>
              <AiOutlinePlus />
            </span>
            New Invoice
          </Button>
        </div>
      </div>
      <div className="invoices-list-page_list-container">
        <InvoiceCard />
        <InvoiceCard />
        <InvoiceCard />
        <InvoiceCard />
      </div>
    </div>
  );
};

export default InvoicesListPage;
