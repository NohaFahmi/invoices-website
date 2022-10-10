import { useState } from "react";
import { Modal, Button } from "antd";
import "../utils/styles/components/confirmation-modal.scss";
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
  const [isModalOpen, setIsModalOpen] = useState(showModal);

  const handleOk = () => {
    onConfirm();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
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
