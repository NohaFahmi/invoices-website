import { Button, Form, Input, DatePicker, Select, Space } from "antd";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { IInvoice } from "../interfaces/invoice.interface";

const InvoiceForm = ({
  invoice,
  onCancel,
  onSavingInvoice,
  onSavingDraft,
}: {
  invoice?: IInvoice;
  onCancel: () => void;
  onSavingInvoice: (invoice: IInvoice) => void;
  onSavingDraft: (invoice: IInvoice) => void;
}) => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";

  let invoiceValues = {
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
    invoiceDate: invoice ? moment(invoice.invoiceDate, dateFormat) : undefined,
    description: invoice?.description || "",
    paymentTerms: invoice?.paymentTerms || "",
    items: invoice?.items || [],
  };
  const validationRules = [
    { required: true, message: "This field is required!" },
    {
      type: "object" as const,
      required: true,
      message: "This field is required!",
    },
  ];
  const { Option } = Select;
  const getTotalPriceForItem = (qty: number, price: number): number => {
    return qty * price;
  };
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={invoice ? invoiceValues : {}}
      onValuesChange={(changedVal, val) => {
        invoiceValues = val;
        if (changedVal["items"]) {
          const { items } = form.getFieldsValue();
          items.map(
            (item: { quantity: number; price: number; total: number }) => {
              item.total = getTotalPriceForItem(item.quantity, item.price);
            }
          );
          form.setFieldsValue("items");
        }
      }}
    >
      <h1 className="form-title">Bill From</h1>
      <Form.Item
        label="Street Address"
        name="stAddress"
        rules={[validationRules[0]]}
      >
        <Input />
      </Form.Item>
      <Form.Item className="input-group">
        <Form.Item
          label="City"
          className="location-input"
          name="city"
          rules={[validationRules[0]]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Post Code"
          className="location-input"
          name="postCode"
          rules={[validationRules[0]]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Country"
          className="location-input"
          name="country"
          rules={[validationRules[0]]}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      <h1 className="form-title">Bill To</h1>
      <Form.Item
        label="Client’s Name"
        name="clientName"
        rules={[validationRules[0]]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Client’s Email"
        name="clientEmail"
        rules={[validationRules[0]]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Street Address"
        name="clientStAddress"
        rules={[validationRules[0]]}
      >
        <Input />
      </Form.Item>

      <Form.Item className="input-group">
        <Form.Item label="City" name="clientCity" rules={[validationRules[0]]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Post Code"
          name="clientPostCode"
          rules={[validationRules[0]]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Country"
          name="clientCountry"
          rules={[validationRules[0]]}
        >
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item className="input-group">
        <Form.Item
          className="date-input"
          label="Invoice Date"
          rules={[validationRules[1]]}
          name="invoiceDate"
        >
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item
          label="Payment Terms"
          name="paymentTerms"
          className="payment-input"
          rules={[validationRules[0]]}
        >
          <Select size="large" className="payment-selection">
            <Option value={1}>Next 1 days</Option>
            <Option value={7}>Next 7 day</Option>
            <Option value={14}>Next 14 days</Option>
            <Option value={30}>Next 30 days</Option>
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="Project Description"
        name="description"
        rules={[validationRules[0]]}
      >
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
                    rules={[validationRules[0]]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Qty."
                    name={[name, "quantity"]}
                    rules={[validationRules[0]]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Price"
                    name={[name, "price"]}
                    rules={[validationRules[0]]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Total"
                    name={[name, "total"]}
                    rules={[validationRules[0]]}
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
      <div
        className="form-actions"
        style={{
          justifyContent: invoice ? "flex-end" : "space-between",
        }}
      >
        <Button
          className="btn-grey"
          onClick={() => {
            form.resetFields();
            onCancel();
          }}
        >
          Cancel
        </Button>
        <div className="form-actions_btns">
          {!invoice && (
            <Button
              className="btn-dark"
              onClick={() => {
                let invoice: IInvoice = {
                  billingClient: {
                    clientAddress:
                      invoiceValues.clientStAddress +
                      "-" +
                      invoiceValues.clientCity +
                      "-" +
                      invoiceValues.clientPostCode +
                      "-" +
                      invoiceValues.clientCountry,
                    clientEmail: invoiceValues.clientEmail,
                    clientName: invoiceValues.clientName,
                  },
                  description: invoiceValues.description,
                  invoiceDate: moment(invoiceValues.invoiceDate, dateFormat)
                    .toDate()
                    .toISOString(),
                  items: invoiceValues.items,
                  paymentTerms: Number(invoiceValues.paymentTerms),
                  senderAddress:
                    invoiceValues.stAddress +
                    "-" +
                    invoiceValues.city +
                    "-" +
                    invoiceValues.postCode +
                    "-" +
                    invoiceValues.country,
                  status: 1,
                };
                onSavingDraft(invoice);
              }}
            >
              Save as Draft
            </Button>
          )}
          <Button
            className="btn-default"
            onClick={() => {
              let invoice = {
                billingClient: {
                  clientAddress:
                    invoiceValues.clientStAddress +
                    "-" +
                    invoiceValues.clientCity +
                    "-" +
                    invoiceValues.clientPostCode +
                    "-" +
                    invoiceValues.clientCountry,
                  clientEmail: invoiceValues.clientEmail,
                  clientName: invoiceValues.clientName,
                },
                description: invoiceValues.description,
                invoiceDate: moment(invoiceValues.invoiceDate, dateFormat)
                  .toDate().toISOString(),
                items: [...invoiceValues.items],
                paymentTerms: Number(invoiceValues.paymentTerms),
                senderAddress:
                  invoiceValues.stAddress +
                  "-" +
                  invoiceValues.city +
                  "-" +
                  invoiceValues.postCode +
                  "-" +
                  invoiceValues.country,
                status: 2,
              };
              onSavingInvoice(invoice);
            }}
            htmlType="submit"
          >
            Save & Send
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default InvoiceForm;
