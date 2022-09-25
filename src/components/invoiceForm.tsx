import {
  Button,
  Form,
  Input,
  Radio,
  DatePicker,
  Select,
  Layout,
  Space,
} from "antd";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { PlusOutlined } from "@ant-design/icons";

const InvoiceForm = () => {
  type LayoutType = Parameters<typeof Form>[0]["layout"];
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const { Option } = Select;
  return (
    <Form layout="vertical" form={form}>
      <h1 className="form-title">Bill From</h1>
      <Form.Item label="Street Addresss">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item className="input-group">
        <Form.Item label="City" className="location-input">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Post Code" className="location-input">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Country" className="location-input">
          <Input placeholder="input placeholder" />
        </Form.Item>
      </Form.Item>

      <h1 className="form-title">Bill To</h1>
      <Form.Item label="Client’s Name">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Client’s Email">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Street Address">
        <Input placeholder="input placeholder" />
      </Form.Item>

      <Form.Item className="input-group">
        <Form.Item label="City">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Post Code">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Country">
          <Input placeholder="input placeholder" />
        </Form.Item>
      </Form.Item>
      <Form.Item className="input-group">
        <Form.Item label="Invoice Date" className="date-input">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Payment Terms" className="payment-input">
          <Select
            defaultValue="30 days"
            size="large"
            className="payment-selection"
          >
            <Option value="jack">2 days</Option>
            <Option value="lucy">1 day</Option>
            <Option value="Yiminghe">2 weeks</Option>
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item label="Project Description">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <div>
        <h3 className="form-subtitle">Item List</h3>
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} className="form-group">
                  <Form.Item
                    {...restField}
                    label="Item Name"
                    name={[name, "Item Name"]}
                  >
                    <Input placeholder="Item Name" />
                  </Form.Item>
                  <Form.Item {...restField} label="Qty." name={[name, "Qty"]}>
                    <Input placeholder="Qty." />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Price"
                    name={[name, "Price"]}
                  >
                    <Input placeholder="Price" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Total"
                    name={[name, "Total"]}
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
