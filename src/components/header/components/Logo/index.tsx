import Title from "antd/es/typography/Title";
import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";

type GlobalLogoProps = {};

/**
 * 网站logo
 * @param props
 * @returns
 */
export default function GlobalLogo(props: GlobalLogoProps) {
  return (
    <div className=" flex items-center  gap-2">
      <Image src="/images/logo.png" alt="logo" width={30} height={30} />
      <Title level={5} className="w-28" style={{ margin: 0 }}>
        {SITE_CONFIG.name}
      </Title>
    </div>
  );
}
