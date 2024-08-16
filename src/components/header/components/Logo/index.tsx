import Title from "antd/es/typography/Title";
import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";

type GlobalLogoProps = {
  hideTitle?: boolean;
};

/**
 * 网站logo
 * @param props
 * @returns
 */
export default function GlobalLogo(props: GlobalLogoProps) {
  const { hideTitle } = props;
  return (
    <div className=" flex items-center  gap-2">
      <Image src="/images/logo.png" alt="logo" width={30} height={30} />
      {!hideTitle && (
        <Title level={5} className="w-28" style={{ margin: 0 }}>
          {SITE_CONFIG.title}
        </Title>
      )}
    </div>
  );
}
