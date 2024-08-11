import { Modal } from "antd";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { TRANSPARENT_MODAL } from "@/constants/modal";

type GlobalLoginModalProps = {};

/**
 * 全局通用的登录弹框组件【可配置】
 * @param props
 * @returns
 */
export default NiceModal.create((props: GlobalLoginModalProps) => {
  const { hide, visible } = useModal();
  return (
    <Modal
      open={visible}
      onOk={hide}
      onCancel={hide}
      footer={false}
      centered
      styles={TRANSPARENT_MODAL}
    >
      <div className="p-5 min-h-64 bg-gradient-to-br from-pink-200 to-purple-100 rounded-lg shadow-lg">
        登录弹框最佳实践，此处省略一些输入框【待补充】
      </div>
    </Modal>
  );
});
