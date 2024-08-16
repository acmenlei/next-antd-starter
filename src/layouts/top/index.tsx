import GlobalFooter from "@/components/Footer";
import GlobalHeader from "@/components/Header";
import { ReactNode } from "react";

type TopLayoutProps = {
  children: ReactNode;
};

/**
 * 导航 top 布局【暂时废弃】
 * @param props
 * @returns
 */
export default function TopLayout({ children }: TopLayoutProps) {
  return (
    <>
      <GlobalHeader />
      {children}
      <GlobalFooter />
    </>
  );
}
