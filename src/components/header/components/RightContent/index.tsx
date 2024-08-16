"use client";

import { showLogin } from "@/utils/modal";
import { Button } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

type LoginTriggerProps = {
  size?: SizeType;
  className?: string;
};

/**
 * 登录触发按钮
 * @param props
 * @returns
 */
export default function LoginTrigger(props: LoginTriggerProps) {
  const { size = "middle", className } = props;
  return (
    <Button
      size={size}
      className={className}
      type="primary"
      onClick={showLogin}
    >
      登录
    </Button>
  );
}
