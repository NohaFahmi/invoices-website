import { IoIosArrowForward } from "react-icons/io";
import "../utils/styles/components/invoice-card.scss";
import { GoPrimitiveDot } from "react-icons/go";

const InvoiceCard = () => {
  return (
    <div className="invoice-card-container">
      <h5 className="invoice-card-container__id">
        <span>#</span>RT3080
      </h5>
      <p className="invoice-card-container__duedate">
        Due
        <span>19 Aug 2021</span>
      </p>
      <p className="invoice-card-container__name">Jensen Huang</p>
      <h3 className="invoice-card-container__amount">£ 1,800.90</h3>
      <div className="invoice-card-container__status status-1">
        <GoPrimitiveDot />
        <span>paid</span>
      </div>
      <IoIosArrowForward className="invoice-card-container__cta-btn" />
    </div>
  );
};

export default InvoiceCard;
