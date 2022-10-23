import {IInvoice} from '../interfaces/invoice.interface';
import HttpRequest from './httpRequest';
const  InvoicesService = ():any=> {
    return {
      getAllInvoices: ()=> {
        return HttpRequest({
          url: '/invoices/',
          method: 'GET',
          data: {},
        });
      },
      getInvoiceById: (id: string) => {
        return HttpRequest({
          url: `/invoices/${id}`,
          method: 'GET',
          data: {},
        });
      },
      updateInvoice: (id: string, invoiceInfo: any) => {
        return HttpRequest({
          url: `/invoices/${id}`,
          method: 'POST',
          data: invoiceInfo,
        });
      },
      deleteInvoiceById: (id: string) => {
        return HttpRequest({
          url: `/invoices/${id}`,
          method: 'DELETE',
          data: {},
        });
      },
      createInvoice: (invoice: IInvoice) => {
        return HttpRequest({
          url: `/invoices/create`,
          method: 'POST',
          data: invoice,
        });
      },
      filterInvoices: (status: number) => {
        return HttpRequest({
          url: `/invoices/filter`,
          method: 'POST',
          data: {
            status: status
          }
          ,
        });
      },
      changeInvoicePaymentStatus: (id: string, status: number) => {
        return HttpRequest({
          url: `/invoices/changeStatus`,
          method: 'POST',
          data: {
            id: id,
            status:status
          },
        });
      }
    };
  };
  
  export default InvoicesService();
  // next step will be dispatch the actions from ui into then of these services;
