import { Button, Form, Input, DatePicker, Select, Space } from "antd";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { IInvoice } from "../interfaces/invoice.interface";

const InvoiceForm = ({ invoice }: { invoice?: IInvoice }) => {
  const [form] = Form.useForm();
  const invoiceInitialValues = {
    stAddress: invoice?.senderAddress.split("-")[0] || "",
    city: invoice?.senderAddress.split("-")[1] || "",
    postCode: invoice?.senderAddress.split("-")[2] || "",
    country: invoice?.senderAddress.split("-")[3] || "",
    clientName: invoice?.billingClient.clientName || "",
    clientEmail: invoice?.billingClient.clientEmail || "",
    clientStAddress: invoice?.billingClient.clientAddress.split("-")[0] || "",
    clientCity: invoice?.billingClient.clientAddress.split("-")[1] || "",
    clientPostCode: invoice?.billingClient.clientAddress.split("-")[2] || "",
    clientCountry: invoice?.billingClient.clientAddress.split("-")[3] || "",
    invoiceDate: moment(invoice?.invoiceDate).format("YYYY-MM-DD") || "",
    description: invoice?.description || "",
    paymentTerms: invoice?.paymentTerms || "",
    items: invoice?.items || [],
  };
  // const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
  //   setFormLayout(layout);
  // };
  console.log("LIST", invoiceInitialValues, invoice);
  const { Option } = Select;
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={invoice ? invoiceInitialValues : {}}
    >
      <h1 className="form-title">Bill From</h1>
      <Form.Item label="Street Addresss" name="stAddress">
        <Input />
      </Form.Item>
      <Form.Item className="input-group">
        <Form.Item label="City" className="location-input" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Post Code" className="location-input" name="postCode">
          <Input />
        </Form.Item>
        <Form.Item label="Country" className="location-input" name="country">
          <Input />
        </Form.Item>
      </Form.Item>

      <h1 className="form-title">Bill To</h1>
      <Form.Item label="Client’s Name" name="clientName">
        <Input />
      </Form.Item>
      <Form.Item label="Client’s Email" name="clientEmail">
        <Input />
      </Form.Item>
      <Form.Item label="Street Address" name="clientStAddress">
        <Input />
      </Form.Item>

      <Form.Item className="input-group">
        <Form.Item label="City" name="clientCity">
          <Input />
        </Form.Item>
        <Form.Item label="Post Code" name="clientPostCode">
          <Input />
        </Form.Item>
        <Form.Item label="Country" name="clientCountry">
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item className="input-group">
        <Form.Item className="date-input" label="Invoice Date">
          <DatePicker
            defaultValue={moment(
              invoiceInitialValues.invoiceDate,
              "YYYY-MM-DD"
            )}
          />
        </Form.Item>
        <Form.Item
          label="Payment Terms"
          name="paymentTerms"
          className="payment-input"
        >
          <Select size="large" className="payment-selection">
            <Option value={1}>Next 1 days</Option>
            <Option value={7}>Next 7 day</Option>
            <Option value={14}>Next 14 days</Option>
            <Option value={30}>Next 30 days</Option>
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item label="Project Description" name="description">
        <Input />
      </Form.Item>
      <div>
        <h3 className="form-subtitle">Item List</h3>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} className="form-group">
                  <Form.Item
                    {...restField}
                    label="Item Name"
                    name={[name, "name"]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Qty."
                    name={[name, "quantity"]}
                  >
                    <Input placeholder="Qty." />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Price"
                    name={[name, "price"]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Total"
                    name={[name, "total"]}
                  >
                    <Input placeholder="Total" disabled />
                  </Form.Item>
                  <MdDelete
                    onClick={() => remove(name)}
                    size="40px"
                    className="delete-icon"
                  />
                </Space>
              ))}
              <Form.Item>
                <Button onClick={() => add()} className="btn-wide">
                  + Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
      <Form.Item className="form-actions">
        <Button className="btn-grey">Cancel</Button>
        <Button className="btn-default">Save Changes</Button>
      </Form.Item>
    </Form>
  );
};
export default InvoiceForm;
