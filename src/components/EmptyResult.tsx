import "../assets/styles/components/empty-result.scss";

const EmptyResult = () => {
  return (
    <div className="empty-result">
      <img
        src={process.env.PUBLIC_URL + "/images/illustration-empty.svg"}
        alt="empty-result"
      />
      <h2 className="empty-result_title">There is nothing here</h2>
      <p className="empty-result_subtitle">
        Create an invoice by clicking the <span>New Invoice</span> button and
        get started
      </p>
    </div>
  );
};
export default EmptyResult;
