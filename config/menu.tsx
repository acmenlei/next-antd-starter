import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined, PayCircleOutlined } from "@ant-design/icons";

const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    path: "https://yuyuanweb.yuque.com/org-wiki-yuyuanweb-zvq1bg/oue2nx/dhozthkoa1wn2t4s",
    target: "_blank",
    name: "刷题路线",
    children: [
      {
        path: "https://yuyuanweb.yuque.com/org-wiki-yuyuanweb-zvq1bg/oue2nx/dhozthkoa1wn2t4s",
        target: "_blank",
        name: "Java八股文刷题路线",
      },
    ],
  },
  {
    path: "https://yuyuanweb.yuque.com/org-wiki-yuyuanweb-zvq1bg/oue2nx/ik6d3mv2wapbx96w",
    target: "_blank",
    name: "邀请有赏",
    icon: <PayCircleOutlined />,
    className: "invite-reward", // 添加类名
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    access: ["admin", "operator"],
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: ["admin"],
      },
      {
        path: "/admin/question",
        name: "题目管理",
        access: ["admin", "operator"],
      },
      {
        path: "/admin/questionBank",
        name: "题库管理",
        access: ["admin"],
      },
      {
        path: "/admin/questionAnswer",
        name: "题目回答管理",
        access: ["admin"],
      },
      {
        path: "/admin/tags",
        name: "标签管理",
        access: ["admin"],
      },
      {
        path: "/admin/tagCategory",
        name: "标签类别管理",
        access: ["admin"],
      },
      {
        path: "/admin/orders",
        name: "订单管理",
        access: ["admin"],
      },
      {
        path: "/admin/vipCode",
        name: "会员码管理",
        access: ["admin"],
      },
    ],
  },
] as MenuDataItem[];

export default menus;

/**
 * 根据路径获取菜单项
 * @param path
 */
export function getMenuItemByPath(path: string) {
  return getMenuItemByPathInner(menus, path);
}

/**
 * 从特定菜单项列表中根据路径获取菜单项（用于递归）
 * @param menus
 * @param path
 */
function getMenuItemByPathInner(
  menus: MenuDataItem[],
  path: string
): MenuDataItem | null {
  if (!menus || menus.length < 1) {
    return null;
  }
  for (const menu of menus) {
    // 找到匹配的项，返回该项
    if (menu.path === path) {
      return menu;
    }
    // 递归查找子项
    if (menu.children) {
      return getMenuItemByPathInner(menu.children, path);
    }
  }
  return null;
}
