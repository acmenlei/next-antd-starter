import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import LoginTrigger from "./components/RightContent";
import Navgation from "./components/Nav";
import GlobalLogo from "./components/Logo";
import { LAYOUT_TYPE } from "@/constants";

type GlobalHeaderProps = {
  layout?: string; // 布局类型
  onCollapsed?: () => void;
};

/**
 * 默认的头部导航
 * @param props
 * @returns
 */
export default function GlobalHeader(props: GlobalHeaderProps) {
  const { layout = LAYOUT_TYPE.TOP, onCollapsed } = props;

  if (layout === LAYOUT_TYPE.TOP) {
    return (
      <div className="flex h-14 shadow px-4 justify-between items-center">
        <GlobalLogo />
        <Navgation />
        <LoginTrigger />
      </div>
    );
  }

  return (
    <div className="border-r sticky top-0">
      <div className="flex justify-between items-center p-5">
        <GlobalLogo />
        {/* <LoginTrigger size="small" /> */}
        <TbLayoutSidebarLeftCollapse
          className=" cursor-pointer hover:opacity-80 absolute right-0 translate-x-1/2"
          size={30}
          onClick={onCollapsed}
        />
        {/* <TbLayoutSidebarRightCollapse size={30} /> */}
      </div>
      <Navgation mode="inline" />
    </div>
  );
}
