"use client";

import GlobalFooter from "@/components/Footer";
import GlobalLogo from "@/components/Header/components/Logo";
import { SITE_CONFIG } from "@/config/site";
import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import Link from "next/link";
import { ReactNode } from "react";
import menus from "../../../config/menu";
import useLoginUser from "@/hooks/useLoginUser";
import "./index.scss";

type SideLayoutProps = {
  children: ReactNode;
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
 * 导航 side 布局
 * @param props
 * @returns
 */
export default function SideLayout({ children }: SideLayoutProps) {
  const loginUser = useLoginUser();

  return (
    <ProLayout
      itemIcon={1}
      title={SITE_CONFIG.title}
      logo={<GlobalLogo hideTitle />}
      onCollapse={onCollapse}
      fixSiderbar
      style={{ outline: "none" }}
      menuDataRender={() => menuItemFilter(menus, loginUser)}
      menuItemRender={menuItemRender}
      pageTitleRender={false}
      footerRender={() => <GlobalFooter />}
    >
      {children}
    </ProLayout>
  );
}

// <Layout>
//   <Sider style={siderStyle} trigger={null} collapsible collapsed={false}>
//     <GlobalHeader layout={LAYOUT_TYPE.SIDE} />
//   </Sider>
//   <Layout style={{ marginInlineStart: 200 }}>
//     <Content>{children}</Content>
//     <Footer>
//       <GlobalFooter />
//     </Footer>
//   </Layout>
// </Layout>
