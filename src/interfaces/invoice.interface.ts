export interface IInvoice {
    _id?: string;
    invoiceID?: string;
    senderAddress: string;
    invoiceDate: string;
    paymentDue: string;
    paymentTerms: number;
    status: number;
    description: string;
    items: IInvoiceItem[];
    billingClient: IClientInfo;
    totalInvoicePrice?: number;
    updatedAt?: string;
    createdAt?: string;
}

export interface IClientInfo {
    clientName: string;
        clientEmail: string;
        clientAddress: string;
}
export interface IInvoiceItem {
        name: string;
        quantity: number;
        price:number;
        total: number;
}

export interface IInvoiceState {
    invoices: IInvoice[];
    invoice?: IInvoice;
    result?: boolean;
    error?: any;
    loading: boolean;
}
export interface IInvoiceAction {
    type: string;
    payload: any;
}