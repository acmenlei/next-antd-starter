import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";

type ConfirmModalProps = {
  onOk?: () => void;
  onCancel?: () => void;
  description?: string;
  title?: string;
  okText?: string;
  cancelText?: string;
};
/**
 * 确认弹框
 */
export default NiceModal.create(
  ({
    onOk,
    onCancel,
    description,
    title,
    okText,
    cancelText,
  }: ConfirmModalProps) => {
    const { visible, hide } = useModal();
    return (
      <Modal
        title={title ?? "提示"}
        open={visible}
        onOk={() => {
          onOk?.();
          hide();
        }}
        onCancel={() => {
          onCancel?.();
          hide();
        }}
        cancelText={cancelText ?? "取消"}
        okText={okText ?? "确定"}
      >
        {description ?? "是否确认执行该操作？"}
      </Modal>
    );
  }
);
