import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import { invoiceReducer } from '../reducers/invoiceReducer';

const store = configureStore({
    reducer: invoiceReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;