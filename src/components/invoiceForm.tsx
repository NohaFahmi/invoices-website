import {Button, Form, Input, DatePicker, Select, Space, message} from "antd";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { IInvoice } from "../interfaces/invoice.interface";
import {useCallback, useEffect, useState} from "react";

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
  const [disabled, setDisabled] = useState(true);
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
    items: invoice? invoice.items:  [],
  };
  const textValidationRules = [
    { required: true,
      message: "Required!"},
    {
      type: "object" as const,
      required: true,
      message: "Required!",
    }
  ];
  const { Option } = Select;
  const getTotalPriceForItem = (qty: number, price: number): number => {
    return qty * price;
  };
  const onFormValidation = useCallback(async () => {
    form
        .validateFields()
        .then(() => {
          if(form.getFieldValue('items') == undefined) {
            setDisabled(true)
            console.log("HERE")
          }
          setDisabled(false);
        })
        .catch((errors) => {
          console.log(errors)
          setDisabled(true)
        });
  }, [form]);
  const onSubmitInvoice = (isDraft?: boolean) => {
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
      status: isDraft ? 1 : 2,
    };
    if(invoice.items.length > 0) {
        isDraft ?onSavingDraft(invoice) : onSavingInvoice(invoice)
    } else {
      message.error('Your invoice should have at least 1 item!', 2);
    }
  }
  return (
   <>
     <Form
         layout="vertical"
         form={form}
         initialValues={invoiceValues}
         onValuesChange={async (changedVal, val) => {
           invoiceValues = val;
           if (changedVal["items"]) {
             const { items } = form.getFieldsValue();
             items.map(
                 (item: { quantity: number; price: number; total: number }) => {
                   item.total = item.quantity > 0 && item.price > 0  ? getTotalPriceForItem(item.quantity, item.price): 0;
                 }
             );
             form.setFieldsValue("items");
           }
         }}
         onChange={(changedVal, ) => {
           onFormValidation();
         }}
     >
       <h1 className="form-title">Bill From</h1>
       <Form.Item
           label="Street Address"
           name="stAddress"
           rules={[textValidationRules[0]]}
       >
         <Input />
       </Form.Item>
       <Form.Item className="input-group">
         <Form.Item
             label="City"
             className="location-input"
             name="city"
             rules={[textValidationRules[0]]}
         >
           <Input />
         </Form.Item>
         <Form.Item
             label="Post Code"
             className="location-input"
             name="postCode"
             rules={[textValidationRules[0]]}
         >
           <Input />
         </Form.Item>
         <Form.Item
             label="Country"
             className="location-input"
             name="country"
             rules={[textValidationRules[0]]}
         >
           <Input />
         </Form.Item>
       </Form.Item>

       <h1 className="form-title">Bill To</h1>
       <Form.Item
           label="Client’s Name"
           name="clientName"
           rules={[textValidationRules[0]]}
       >
         <Input />
       </Form.Item>
       <Form.Item
           label="Client’s Email"
           name="clientEmail"
           rules={[textValidationRules[0]]}
       >
         <Input />
       </Form.Item>
       <Form.Item
           label="Street Address"
           name="clientStAddress"
           rules={[textValidationRules[0]]}
       >
         <Input />
       </Form.Item>

       <Form.Item className="input-group">
         <Form.Item label="City" name="clientCity" rules={[textValidationRules[0]]}>
           <Input />
         </Form.Item>
         <Form.Item
             label="Post Code"
             name="clientPostCode"
             rules={[textValidationRules[0]]}
         >
           <Input />
         </Form.Item>
         <Form.Item
             label="Country"
             name="clientCountry"
             rules={[textValidationRules[0]]}
         >
           <Input />
         </Form.Item>
       </Form.Item>
       <Form.Item className="input-group">
         <Form.Item
             className="date-input"
             label="Invoice Date"
             rules={[textValidationRules[1]]}
             name="invoiceDate"
         >
           <DatePicker format={dateFormat} status={"error"}/>
         </Form.Item>
         <Form.Item
             label="Payment Terms"
             name="paymentTerms"
             className="payment-input"
             rules={[textValidationRules[0]]}
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
           rules={[textValidationRules[0]]}
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
                           rules={[textValidationRules[0]]}
                       >
                         <Input />
                       </Form.Item>
                       <Form.Item
                           {...restField}
                           label="Qty."
                           name={[name, "quantity"]}
                           rules={[textValidationRules[0]]}
                       >
                         <Input type='number' min='1'/>
                       </Form.Item>
                       <Form.Item
                           {...restField}
                           label="Price"
                           name={[name, "price"]}
                           rules={[textValidationRules[0]]}
                       >
                         <Input type='number' min='0'/>
                       </Form.Item>
                       <Form.Item
                           {...restField}
                           label="Total"
                           name={[name, "total"]}
                       >
                         <Input placeholder="Total" disabled />
                       </Form.Item>
                       <MdDelete
                           onClick={() => {
                             remove(name);
                           }}
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
                     onSubmitInvoice(true);
                   }}
                   disabled={disabled}>
                 Save as Draft
               </Button>
           )}
           <Button
               className="btn-default"
               disabled={disabled}
               onClick={() => {
                 onSubmitInvoice()
               }}
           >
             Save & Send
           </Button>
         </div>
       </div>
     </Form>


   </>
  );
};
export default InvoiceForm;
