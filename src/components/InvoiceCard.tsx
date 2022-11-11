import { IoIosArrowForward } from "react-icons/io";
import "../assets/styles/components/invoice-card.scss";
import { GoPrimitiveDot } from "react-icons/go";
import { IInvoice } from "../interfaces/invoice.interface";
import { useNavigate } from "react-router-dom";
import { invoiceStatus } from "../pages/InvoicesListPage";

const InvoiceCard = ({ invoice }: { invoice: IInvoice }) => {
  const navigate = useNavigate();

  const navigateToInvoiceDetails = (id: string | undefined) => {
    navigate(`/invoice/${id}`);
  };
  return invoice ? (
    <div
      className="invoice-card-container"
      onClick={() => {
        navigateToInvoiceDetails(invoice._id);
      }}
    >
      <h5 className="invoice-card-container__id">
        <span>#</span>
        {invoice.invoiceID}
      </h5>
      <p className="invoice-card-container__duedate">
        Due
        {invoice.paymentDue && (
          <span>
            {Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(new Date(invoice.paymentDue))}
          </span>
        )}
      </p>
      <div className="invoice-card-container__mid-part">
        <p className="invoice-card-container__name">
          {invoice.billingClient.clientName}
        </p>
        <h3 className="invoice-card-container__amount">
          £ {invoice.totalInvoicePrice?.toFixed(0)}
        </h3>
      </div>
      {invoice.status && (
        <div
          className={`invoice-card-container__status status-${invoice.status}`}
        >
          <GoPrimitiveDot />
          <span>{invoiceStatus[invoice.status]}</span>
        </div>
      )}
      <IoIosArrowForward className="invoice-card-container__cta-btn" />
    </div>
  ) : (
    <></>
  );
};

export default InvoiceCard;
