"use client";

import GlobalFooter from "@/components/Footer";
import GlobalLogo from "@/components/Header/components/Logo";
import { SITE_CONFIG } from "@/config/site";
import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import Link from "next/link";
import { ReactNode } from "react";
import useLoginUser from "@/hooks/useLoginUser";
import menus from "../../config/menu";

type BaseLayoutProps = {
  children: ReactNode;
  layout?: "side" | "top";
};

const menuItemFilter = (menuItems: MenuDataItem[], user: any) => {
  return menuItems.filter((item) => {
    // if (item.access && !checkAccess(user, item.access)) {
    //   return false;
    // }
    if (item.children) {
      item.children = menuItemFilter(item.children, user);
    }
    return true;
  });
};

const menuItemRender = (item: MenuDataItem, dom: ReactNode) => {
  return item.target ? (
    <Link
      href={item.path || "/"}
      target="_blank"
      className={item.className || ""}
    >
      {dom}
    </Link>
  ) : (
    <Link href={item.path || "/"} className={item.className || ""}>
      {dom}
    </Link>
  );
};

const onCollapse = (collapsed: boolean) => {
  document.body.style.overflow = collapsed ? "auto" : "hidden";
};

/**
 * 通用布局
 * @param props
 * @returns
 */
export default function BaseLayout({ children }: BaseLayoutProps) {
  const loginUser = useLoginUser();

  return (
    <ProLayout
      itemIcon={1}
      title={SITE_CONFIG.title}
      layout="top"
      logo={<GlobalLogo hideTitle />}
      onCollapse={onCollapse}
      fixSiderbar
      style={{ minHeight: "100vh" }}
      menuDataRender={() => menuItemFilter(menus, loginUser)}
      menuItemRender={menuItemRender}
      pageTitleRender={false}
      footerRender={() => <GlobalFooter />}
    >
      {children}
    </ProLayout>
  );
}
