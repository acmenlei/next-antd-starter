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
      title="用户登录"
      open={modalInstance.visible}
      onOk={modalInstance.hide}
      onCancel={modalInstance.hide}
    >
      登录弹框最佳实践，此处省略一些输入框
    </Modal>
  );
});
