import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";

type GlobalLoginModalProps = {};

/**
 * 全局通用的登录弹框组件【可配置】
 * @param props
 * @returns
 */
export default NiceModal.create((props: GlobalLoginModalProps) => {
  const modalInstance = useModal();
  return (
    <Modal
      title="Basic Modal"
      open={modalInstance.visible}
      onOk={modalInstance.hide}
      onCancel={modalInstance.hide}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
});
