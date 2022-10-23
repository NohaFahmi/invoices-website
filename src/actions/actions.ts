// Actions are the ones who are fetching the new data and sent to the reducers to update the state.
export const actionTypes = {
    GET_INVOICES: 'GET_INVOICES',
    GET_INVOICE_BY_ID: 'GET_INVOICE_BY_ID',
    DELETE_INVOICE: 'DELETE_INVOICE',
    CREATE_INVOICE: 'CREATE_INVOICE',
    EDIT_INVOICE: 'EDIT_INVOICE',
    FILTER_INVOICES: 'FILTER_INVOICES',
    CHANGE_INVOICE_STATUS: 'CHANGE_INVOICE_STATUS',
} 

export const getAllInvoices = (invoices:[]) => {
    return {
        type: actionTypes.GET_INVOICES,
        payload: invoices
    }
}
export const getInvoiceById = (invoiceId: string) => {
    return {
        type: actionTypes.GET_INVOICE_BY_ID,
        payload: invoiceId
    }
}
export const deleteInvoice = (invoiceId: string) => {
    return {
        type: actionTypes.DELETE_INVOICE,
        payload: invoiceId
    }
}
export const createInvoice = (invoice: any) => {
    return {
        type: actionTypes.CREATE_INVOICE,
        payload: invoice
    }
}
export const editInvoice = (invoice:any) => {
    return {
        type: actionTypes.EDIT_INVOICE,
        payload: invoice
    }
}
export const filterInvoices = (status: number) => {
    return {
        type: actionTypes.FILTER_INVOICES,
        payload: status
    }
}
