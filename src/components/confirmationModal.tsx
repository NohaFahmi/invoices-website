import { Modal, Button } from "antd";
import "../assets/styles/components/confirmation-modal.scss";
const ConfirmationModal = ({
  showModal,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  showModal: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const handleOk = () => {
    onConfirm();
  };

  const handleCancel = () => {
      onCancel();
  };

  return (
    <>
      <Modal
        title={title}
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        className="confirmation-modal"
        footer={[
          <Button
            key="cancel"
            className="btn-grey"
            shape="round"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleOk}
            className="btn-danger"
            shape="round"
          >
            Delete
          </Button>,
        ]}
      >
        <p>{message}</p>
      </Modal>
    </>
  );
};
export default ConfirmationModal;
