import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";
import { IoClose } from "react-icons/io5";

type GlobalPosterModalProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  extra?: React.ReactNode;
};

/**
 * 全局通用的广告/海报组件【可配置】
 * @param props
 * @returns
 */
export default NiceModal.create((props: GlobalPosterModalProps) => {
  const { src, alt, height = 500, width = 500, extra } = props;
  const { visible, hide } = useModal();
  return (
    <Modal
      open={visible}
      onOk={hide}
      onCancel={hide}
      closeIcon={false}
      styles={{
        content: {
          padding: 0,
          background: "transparent",
          boxShadow: "none",
        },
      }}
      style={{ textAlign: "center" }}
      footer={false}
    >
      <img
        draggable={false}
        alt={alt ?? "海报"}
        width={width}
        height={height}
        src={src}
      />
      {extra}
      <div
        onClick={hide}
        className="inline-block bg-black/20 hover:bg-black/30 cursor-pointer active:scale-90 -translate-y-full transition-transform p-2 rounded-full"
      >
        <IoClose size={20} className="text-gray-200" />
      </div>
    </Modal>
  );
});
