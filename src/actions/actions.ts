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
