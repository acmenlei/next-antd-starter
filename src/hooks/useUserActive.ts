import { useEffect, useState } from "react";

// 间隔多久算不活跃
const DEACTIVE_TIME = 60 * 1000;
// 执行时间间隔，一秒一次
const TIME = 1000;
// 活跃触发
const ACTIVE_ACTIONS = [
  "mousemove", //鼠标移动
  "mousedown", //鼠标按下
  "touchstart", //触摸屏幕【移动端】
  "wheel", //鼠标滚轮
  "resize", //页面尺寸变化
  "keydown", //键盘输入
];
/**
 * 验证用户是否正在活跃
 * @returns
 */
export default function useUserActive() {
  // 上一次活跃时间
  let preTime = Date.now();
  // 上一次执行时间
  let preExecTime = 0;
  // 是否正在活跃【默认在活跃】
  const [isActive, setActive] = useState(true);

  // 处理页面离开事件
  function handleVisibilityChange() {
    if (document.visibilityState === "hidden") {
      // 用户离开页面时的处理逻辑
      setActive(false);
    } else if (document.visibilityState === "visible") {
      // 用户返回页面时的处理逻辑
      onActive();
    }
  }

  // 用户离开窗口时的处理逻辑
  function handleWindowBlur() {
    setActive(false);
  }

  // 用户回到窗口时的处理逻辑
  function handleWindowFocus() {
    onActive();
  }

  // 活跃中
  function onActive() {
    //更新状态
    setActive(true);
    // 上次活跃时间记录
    preTime = Date.now();
  }

  // 模拟 setTimeout 效果
  function loop() {
    requestAnimationFrame(() => {
      if (Date.now() - preExecTime < TIME) {
        loop();
        return;
      }
      preExecTime = Date.now();
      renderState();
    });
  }

  // 更新状态信息
  function renderState() {
    if (Date.now() - preTime > DEACTIVE_TIME) {
      setActive(false);
    }
    loop();
  }

  useEffect(() => {
    loop();

    // 处理页面跳出 / 进入事件
    window.addEventListener("visibilitychange", handleVisibilityChange);
    // 处理窗口跳出 / 进入事件
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    // 批量添加事件监听
    ACTIVE_ACTIONS.map((event) => window.addEventListener(event, onActive));

    // 移除所有监听器
    return () => {
      ACTIVE_ACTIONS.map((event) =>
        window.removeEventListener(event, onActive)
      );
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { isActive };
}
