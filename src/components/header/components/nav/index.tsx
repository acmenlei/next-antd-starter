import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "导航1",
    key: "mail",
    // icon: <MailOutlined />,
  },
  {
    label: "导航2",
    key: "app",
    // icon: <AppstoreOutlined />,
  },
  {
    label: "导航3",
    key: "SubMenu",
    // icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          { label: "Option 1", key: "setting:1" },
          { label: "Option 2", key: "setting:2" },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          { label: "Option 3", key: "setting:3" },
          { label: "Option 4", key: "setting:4" },
        ],
      },
    ],
  },
  {
    key: "alipay",
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        导航4
      </a>
    ),
  },
];
type NavgationProps = {
  mode?: "horizontal" | "vertical" | "inline";
};
/**
 * 导航栏
 * @param props
 * @returns
 */
export default function Navgation({ mode = "horizontal" }: NavgationProps) {
  return (
    <Menu
      style={{ lineHeight: 4, border: "none" }}
      className="w-full h-full"
      mode={mode}
      items={items}
    />
  );
}
