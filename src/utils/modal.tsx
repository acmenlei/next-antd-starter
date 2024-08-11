import NiceModal from "@ebay/nice-modal-react";
import LoginModal from "@/components/GlobalModal/Login";
import Confirm from "@/components/GlobalModal/Confirm";
import Poster from "@/components/GlobalModal/Poster";
import CustomModal from "@/components/GlobalModal/Custom";
import { ReactNode } from "react";

/**
 * 登录弹框
 * @returns
 */
export const showLogin = () => NiceModal.show(LoginModal); // show the modal

/**
 * 显示二次确认弹框
 * @param props
 * @returns
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
 * @param props
 * @returns
 */
export const showPoster = (props: { src?: string; alt?: string }) =>
  NiceModal.show(Poster, props);

/**
 * 显示自定义弹框内容
 * @param props
 * @returns
 */
export const showCustomModal = (props: { children: ReactNode }) =>
  NiceModal.show(CustomModal, props);
