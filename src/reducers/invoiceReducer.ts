// Reducers are the one who update the store with the new state
import { actionTypes } from '../actions/actions';
import { IInvoiceState, IInvoiceAction } from '../interfaces/invoice.interface';

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
    [actionTypes.DELETE_INVOICE]: (state: IInvoiceState, action: IInvoiceAction):IInvoiceState => {
        return {
            ...state, invoices:  state.invoices.filter((item) => item._id !== action.payload.id)
        }
    },
    [actionTypes.CREATE_INVOICE]: (state: IInvoiceState, action: IInvoiceAction):IInvoiceState => {
        return {
            ...state, invoices: [...state.invoices, action.payload], invoice: action.payload
        }
    },
    [actionTypes.EDIT_INVOICE]: (state: IInvoiceState, action: IInvoiceAction):IInvoiceState => {
        return {
            ...state, invoice: action.payload
        }
    },
    [actionTypes.FILTER_INVOICES]: (state: IInvoiceState, action: IInvoiceAction):IInvoiceState => {
        return{
            ...state, invoices: action.payload
        }
    },
    [actionTypes.CHANGE_INVOICE_STATUS]: (state: IInvoiceState, action: IInvoiceAction):IInvoiceState => {
        return{
            ...state, invoice: action.payload
        }
    },
}

 export const invoiceReducer = (state:IInvoiceState = initialState, action: IInvoiceAction): IInvoiceState => {
    const handler = actionMap[action.type];
    return handler ? handler(state, action) : state;
}
