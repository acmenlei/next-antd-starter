"use client";

import { useState, useEffect } from "react";
import { message, Select } from "antd";

// 可用字体列表
const fontOptions = [
  { value: "阿里妈妈东方大楷", label: "阿里妈妈东方大楷" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  // 添加更多字体选项
];

type FontsPageProps = {
  // 如果需要，可以添加props
};

/**
 * 字体加载页面
 * @param props
 * @returns
 */
export default function FontsPage(props: FontsPageProps) {
  const [selectedFont, setSelectedFont] = useState("Arial");

  // 动态加载字体
  useEffect(() => {
    const loadFont = async () => {
      const hide = message.loading("加载中");
      try {
        // 这里使用 CSS Font Loading API 动态加载字体
        // 注意：需要替换为实际的字体文件URL
        const font = new FontFace(
          selectedFont,
          `url(/fonts/${selectedFont}.woff)`
        );
        await font.load();
        document.fonts.add(font);
        document.body.style.fontFamily = selectedFont;
      } catch (error) {
        console.error("字体加载失败:", error);
      }
      hide();
    };

    loadFont();
  }, [selectedFont]);

  return (
    <div className=" p-5 rounded-lg flex flex-col gap-4 ">
      <h1>字体选择器</h1>
      <Select
        value={selectedFont}
        onChange={(value) => setSelectedFont(value)}
        options={fontOptions}
      />
      <p style={{ fontFamily: selectedFont }}>
        这是使用 {selectedFont} alibaba字体的示例文本。
      </p>
    </div>
  );
}
