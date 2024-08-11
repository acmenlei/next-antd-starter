import NiceModal from "@ebay/nice-modal-react";
import LoginModal from "@/components/GlobalModal/Login";
import Confirm from "@/components/GlobalModal/Confirm";
import Poster from "@/components/GlobalModal/Poster";

/**
 * 登录弹框
 * @returns
 */
export const showLogin = () => NiceModal.show(LoginModal); // show the modal

/**
 * 显示二次确认弹框
 */
export const showConfirm = (props: {
  onOk?: () => void;
  onCancel?: () => void;
  description?: string;
  title?: string;
  okText?: string;
  cancelText?: string;
}) => NiceModal.show(Confirm, props);

/**
 * 显示广告弹框
 */
export const showPoster = (props: { src?: string; alt?: string }) =>
  NiceModal.show(Poster, props);
