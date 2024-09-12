/**
 * 动态加载字体
 * @param fontName
 */
export const loadFont = async (fontName: string) => {
  try {
    // 从服务器获取字体数据
    const response = await fetch(`/api/fonts/${fontName}`);
    if (!response.ok) throw new Error("Font fetch failed");
    // 将响应转换为 ArrayBuffer
    const fontData: ArrayBuffer = await response.arrayBuffer();
    // 创建 FontFace 对象
    const font = new FontFace(fontName, fontData);
    // 加载字体
    await font.load();
    // 将字体添加到文档
    document.fonts.add(font);
    // 应用字体todo【可以交给外部处理】
    // document.body.style.fontFamily = fontName;
  } catch (error) {
    console.error("字体加载失败:", error);
  }
};
