import LoginTrigger from "./components/RightContent";
import Navgation from "./components/Nav";
import GlobalLogo from "./components/Logo";

type GlobalHeaderProps = {};

/**
 * 默认的头部导航
 * @param props
 * @returns
 */
export default function GlobalHeader(props: GlobalHeaderProps) {
  return (
    <div className="flex h-14 shadow py-1 px-4 justify-between items-center">
      <GlobalLogo />
      <Navgation />
      <LoginTrigger />
    </div>
  );
}
