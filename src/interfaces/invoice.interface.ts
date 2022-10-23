export interface IInvoice {
    _id?: string;
    invoiceID?: string;
    senderAddress: string;
    invoiceDate: string;
    paymentDue?: string;
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
export interface IInvoiceInfo {
    filterInvoices: (status: number) =>IInvoice[]
    getAllInvoices: () =>IInvoice[]
    getInvoiceById: (id: string) => Promise<IInvoice>;
    changeInvoicePaymentStatus: (id: string, status: number) => Promise<IInvoice>;
    deleteInvoiceById: (id: string) => Promise<{message: string}>;
    createInvoice: (invoice: IInvoice) => Promise<IInvoice>;
    updateInvoice: (id: string, invoiceInfo: any) => IInvoice
}
export interface IInvoiceAction {
    type: string;
    payload: any;
}
