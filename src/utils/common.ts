import xss from "xss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import advancedFormat from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
import { message } from "antd";
import { isMobile as __isMobile__ } from "react-device-detect";

// 加载插件
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(advancedFormat);
dayjs.extend(duration);

/**
 * 是否是开发环境
 * @returns true：测试环境，false：线上环境
 */
export const isDev = process.env.NODE_ENV === "development";

/**
 * 是否为移动端
 */
export const isMobile = __isMobile__;

/**
 * PC 端
 */
export const isPC = !__isMobile__;

/**
 * 格式化时间
 * @param time
 * @param format
 */
export const formatTime = (
  time: string,
  format: string = "YYYY-MM-DD HH:mm:ss"
) => {
  return dayjs(time).format(format);
};
/**
 * 倒计时
 * @param time
 * @param format
 */
export const CountdownTime = (time: number, lang: string = "zh") => {
  const _duration = dayjs.duration(time - Date.now(), "milliseconds");
  const hours = String(Math.floor(_duration.asHours())).padStart(2, "0");
  const minutes = String(_duration.minutes()).padStart(2, "0");
  const seconds = String(_duration.seconds()).padStart(2, "0");
  if (lang === "en") {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${hours}时${minutes}分${seconds}秒`;
  }
};
/**
 * 过滤XSS攻击
 * @param content
 * @returns
 */
export const safeHTML = (content?: string) => {
  return xss(content ?? "");
};
/**
 * 睡眠
 * @param time
 * @returns
 */
export const sleep = (time: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * 获取 markdown 内容中的第一张图
 * @param markdown
 * @returns
 */
export const getFirstImageUrl = (markdown?: string): string | null => {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = imageRegex.exec(markdown ?? "");

  return match ? match[1] : null;
};

/**
 * 分转换为元
 * @param fen
 * @param dot
 * @returns
 */
export const fenToYuan = (fen: number = 0, dot: number = 1): string => {
  let yuan = fen / 100;
  if (Number.isInteger(yuan)) {
    return yuan.toString();
  } else {
    // 格式化为两位小数
    return yuan.toFixed(dot);
  }
};

/**
 * 根据万单位来格式化数据
 * @param num
 * @returns
 */
export const formatNumberWithWan = (num: number) => {
  if (!num) {
    return "0";
  }
  num = +num;
  let units = ["", " 万", " 亿"];
  let unitIndex = 0;

  while (num >= 10000 && unitIndex < units.length - 1) {
    num /= 10000;
    unitIndex++;
  }
  if (unitIndex === 0) {
    return num;
  }
  return num.toFixed(num < 100 ? 1 : 0) + units[unitIndex];
};

/**
 * 将一段文本中的链接提取为<a>标签的形式
 * @param text
 * @returns
 */
export const formatLink = (text: string = "") => {
  // 正则表达式匹配URL
  const urlPattern =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  // 替换URL为<a>标签
  return text?.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');
};

/**
 * 格式化时间以现在的时间为基准
 * @param time
 * @returns
 */
export const formatTimeFromNow = (time: string) => {
  const DAY = 1000 * 60 * 60 * 24;
  const TIME_DIFF = Date.now() - new Date(time).getTime();
  // 大于一周的情况
  if (TIME_DIFF > DAY * 7) {
    const thisYear = dayjs(time).year();
    const targetYear = dayjs().year();
    return thisYear === targetYear
      ? dayjs(time).format("MM-DD HH:mm") // 今年
      : dayjs(time).format("YYYY-MM-DD"); // 今年之前
  }
  // 一周内的情况
  if (TIME_DIFF > DAY * 2) {
    return dayjs(time).fromNow();
  }
  // 昨天或今天的情况
  if (TIME_DIFF < DAY * 1) {
    return dayjs(time).calendar();
  }
  return dayjs(time).fromNow();
};

/**
 * 复制到剪切板
 * @param text 复制的文本
 * @param isTip 是否提示
 * @param successText 复制成功提示文本
 * @returns
 */
export const copyTextToClipboard = async (
  text: string,
  isTip = true,
  successText = "已复制到剪贴板"
) => {
  if (!text) {
    return message.warning("复制内容为空");
  }
  if (
    "clipboard" in navigator &&
    navigator.clipboard &&
    "writeText" in navigator.clipboard
  ) {
    try {
      await navigator.clipboard.writeText(text);
      if (isTip) {
        message.success(successText);
      }
      return;
    } catch (err) {
      console.error("无法复制到剪贴板", err);
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    document.body.removeChild(textarea);
    message.success("已复制到剪贴板");
  } catch (err) {
    console.error("无法复制到剪贴板", err);
  }
};

/**
 * 通用错误提示方法
 * @param customText 自定义文本
 * @param e 错误对象
 * @param type 提示类型，默认为'error'
 * @returns 返回提示结果
 */
export function commonErrorTip(customText: string, e: any, type = "error") {
  if (!e.message) return;
  if (type === "error") {
    return message.error(customText + e.message);
  } else {
    return message.warning(customText + e.message);
  }
}
