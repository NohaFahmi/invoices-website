import {Button} from "antd";
import '../utils/styles/components/responsive-footer.scss';

const ResponsiveFooter = (
    {onEditInvoice,
        onDeleteInvoice,
        onChangeInvoiceStatus,
        isPaid
    }: {
        onEditInvoice: () => void,
        onDeleteInvoice: () => void,
        onChangeInvoiceStatus: () => void,
        isPaid: boolean
    }) => {
    return (

    <div className="responsive-footer">
        <div className="cta-btns">
            <Button
                type="primary"
                shape="round"
                className="btn-grey"
                onClick={onEditInvoice}
            >
                Edit
            </Button>
            <Button
                type="primary"
                shape="round"
                className="btn-danger"
                onClick={onDeleteInvoice}
            >
                Delete
            </Button>
            <Button
                type="primary"
                shape="round"
                className="btn-default"
                disabled={isPaid}
                onClick={onChangeInvoiceStatus}
            >
                Mark as paid
            </Button>
        </div>
    </div>
    )
}

export default  ResponsiveFooter;
