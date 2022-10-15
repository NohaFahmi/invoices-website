// Reducers are the one who update the store with the new state
import { actionTypes } from '../actions/actions';
import { IInvoiceState, IInvoiceAction, IInvoice } from '../interfaces/invoice.interface';
 
export const initialState: IInvoiceState = {
    invoices: [],
    loading: false,
}
const actionMap = {
    [actionTypes.GET_INVOICES]: (state: IInvoiceState, 
        action: IInvoiceAction):IInvoiceState =>{
            return{
                ...state, invoices: action.payload
            }
        },
    [actionTypes.GET_INVOICE_BY_ID]: (state: IInvoiceState, action: IInvoiceAction):IInvoiceState => {
        
        return {
            ...state, invoice: action.payload
        }
    },
    [actionTypes.DELETE_INVOICE]: (state: IInvoiceState, action: IInvoiceAction):IInvoiceState => state,
    [actionTypes.CREATE_INVOICE]: (state: IInvoiceState, action: IInvoiceAction):IInvoiceState => state, 
    [actionTypes.EDIT_INVOICE]: (state: IInvoiceState, action: IInvoiceAction):IInvoiceState => state,
    [actionTypes.FILTER_INVOICES]: (state: IInvoiceState, action: IInvoiceAction):IInvoiceState => state,
}

 export const invoiceReducer = (state:IInvoiceState = initialState, action: IInvoiceAction): IInvoiceState => {
    const handler = actionMap[action.type];
    return handler ? handler(state, action) : state;
}
