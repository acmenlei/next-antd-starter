/**
 * 是否是企微环境
 * @returns
 */
export function isWeChatWork() {
  const userAgent = navigator.userAgent.toLowerCase(); // 获取userAgent并转为小写
  return userAgent.includes("wxwork"); // 检查是否包含'wxwork'
}
/**
 * 是否是微信
 * @returns
 */
export function isWechat() {
  if (isWeChatWork()) return false;
  const userAgent = navigator.userAgent.toLowerCase(); // 将用户代理头的值转为小写
  return /micromessenger/i.test(userAgent); //结果为true或者false
}
