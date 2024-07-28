"use client";

import { showLogin } from "@/utils/modal";
import { Button } from "antd";

type LoginTriggerProps = {};

/**
 * 登录触发按钮
 * @param props
 * @returns
 */
export default function LoginTrigger(props: LoginTriggerProps) {
  return <Button onClick={showLogin}>登录</Button>;
}
