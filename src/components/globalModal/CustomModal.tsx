import { TRANSPARENT_MODAL } from "@/constants/modal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

type GlobalCustomModalProps = {
  // width?: number;
  // height?: number;
  children?: ReactNode;
};

/**
 * 自定义弹框组件
 * @param props
 * @returns
 */
export default NiceModal.create((props: GlobalCustomModalProps) => {
  const { children } = props;
  const { visible, hide } = useModal();
  return (
    <Modal
      open={visible}
      onOk={hide}
      onCancel={hide}
      closeIcon={false}
      styles={TRANSPARENT_MODAL}
      style={{ textAlign: "center" }}
      footer={false}
    >
      {children}
      <div
        onClick={hide}
        className="inline-block mt-5 bg-black/20 hover:bg-black/30 cursor-pointer active:scale-90 transition-transform p-2 rounded-full"
      >
        <IoClose size={20} className="text-gray-200" />
      </div>
    </Modal>
  );
});
